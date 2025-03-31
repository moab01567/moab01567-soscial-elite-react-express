import express from "express";
import { LoginConfig } from "./AuthConfig";
import * as authCallback from "./AuthCallback";
import { ELoginType } from "../../shared/interface";
import * as userService from "../users/UserService";
import { getUserInfo } from "./AuthCallback";

export function AuthRouter(loginConfig: LoginConfig) {
  const router = express.Router();

  router.get(
    `/api/login/${ELoginType[loginConfig.loginType]}/auth`,
    async (req, res) => {
      const url = new URL(await loginConfig.authorization_endpoint);
      url.searchParams.append("client_id", loginConfig.client_id);
      url.searchParams.append("response_type", loginConfig.response_type);
      url.searchParams.append("scope", loginConfig.scope);
      url.searchParams.append("nonce", "" + Math.random() * Date.now());
      url.searchParams.append("redirect_uri", loginConfig.redirect_uri);
      res.redirect(url.href);
    },
  );

  router.get(
    `/login/${ELoginType[loginConfig.loginType]}/callback`,
    async (req, res) => {
      try {
        if (!req.query.code) throw new Error("No code present");

        let token: { token_type: string; access_token: string };
        if (loginConfig.loginType === ELoginType.github) {
          token = await authCallback.githubCallback(
            loginConfig,
            req.query.code as string,
          );
        } else {
          token = await authCallback.googleCallback(
            loginConfig,
            req.query.code as string,
          );
        }
        const user_info: any = await getUserInfo(
          await loginConfig.userinfo_endpoint,
          `${token.token_type} ${token.access_token}`,
        );
        await userService.createOrUpdateUser(
          await loginConfig.loginType,
          user_info,
        );
        //jeg tar ikke i bruk JWT, siden det ikke var en del av kravet.
        // men i virkeligheten ta i bruk  JWT her for sikker session
        res.cookie("LoginToken", `${user_info.sub ?? user_info.id}`, {
          maxAge: 1000 * 60 * 60,
        }); //milliseconds
        res.redirect(loginConfig.client_origin);
      } catch (error) {
        res.redirect("/api/logout");
      }
    },
  );

  router.get("/api/logout", (req, res) => {
    res.clearCookie("LoginToken");
    res.clearCookie("LoginType");
    res.clearCookie("UserInfo");
    res.redirect("/");
  });

  return router;
}
