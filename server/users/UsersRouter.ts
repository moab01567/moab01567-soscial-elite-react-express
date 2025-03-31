import { Router } from "express";
import * as userService from "./UserService";
import {
  HttpException,
  HTTP_NOT_AUTHORIZED,
  checkException,
} from "../HttpException";
import { APIMessage } from "../../shared/interface";

export function UsersRouter(): Router {
  const router = Router();

  router.get("/api/user", async (req, res) => {
    try {
      if (req.cookies.LoginToken === undefined)
        throw new HttpException(HTTP_NOT_AUTHORIZED, "Please login");
      res.send(await userService.getUserById(req.cookies.LoginToken));
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });
  router.get("/api/user/:userId", async (req, res) => {
    try {
      res.send(await userService.getUserById(req.params.userId));
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });

  return router;
}
