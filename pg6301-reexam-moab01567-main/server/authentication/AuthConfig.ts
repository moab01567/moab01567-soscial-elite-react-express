import dotenv from "dotenv";
import {
  get_authorization_endpoint,
  get_token_endpoint,
  get_userinfo_endpoint,
} from "./AuthModules";
import { ELoginType } from "../../shared/interface";

dotenv.config({ path: "../.env" });

export interface LoginConfig {
  loginType: ELoginType;
  client_id: string;
  response_type: string;
  client_secret: string;
  scope: string;
  redirect_uri: string;
  client_origin: string;
  authorization_endpoint: Promise<string> | string;
  token_endpoint: Promise<string> | string;
  userinfo_endpoint: Promise<string> | string;
  headers: {};
}

export const googleLoginConfig: LoginConfig = {
  loginType: ELoginType.google,
  client_id: process.env.GOOGLE_CLIENT_ID || "",
  response_type: "code",
  client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
  scope: "email profile",
  redirect_uri: process.env.AUTH_ORIGIN + "/login/google/callback",
  client_origin: process.env.CLIENT_ORIGIN || "",
  authorization_endpoint: get_authorization_endpoint(
    "https://accounts.google.com/.well-known/openid-configuration",
  ),
  token_endpoint: get_token_endpoint(
    "https://accounts.google.com/.well-known/openid-configuration",
  ),
  userinfo_endpoint: get_userinfo_endpoint(
    "https://accounts.google.com/.well-known/openid-configuration",
  ),
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
};

export const githubLoginConfig: LoginConfig = {
  loginType: ELoginType.github,
  client_id: process.env.GITHUB_CLIENT_ID || "",
  response_type: "code",
  client_secret: process.env.GITHUB_CLIENT_SECRET || "",
  scope: "user:email",
  redirect_uri: process.env.AUTH_ORIGIN + "/login/github/callback",
  client_origin: process.env.CLIENT_ORIGIN || "",
  authorization_endpoint: "https://github.com/login/oauth/authorize",
  token_endpoint: "https://github.com/login/oauth/access_token",
  userinfo_endpoint: "https://api.github.com/user",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
