import express from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./authentication/AuthRouter";
import {
  githubLoginConfig,
  googleLoginConfig,
} from "./authentication/AuthConfig";
import cookieParser from "cookie-parser";
import { UsersRouter } from "./users/UsersRouter";
import { ArticlesRouter } from "./articles/ArticlesRouter";
import { ReactionRouter } from "./reaction/ReactionRouter";
dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(AuthRouter(googleLoginConfig));
app.use(AuthRouter(githubLoginConfig));
app.use(UsersRouter());
app.use(ArticlesRouter());
app.use(ReactionRouter());
app.use(express.static("../client/dist"));
app.use("*", express.static("../client/dist"));

if (process.env.NODE_ENV !== "test") {
  PORT ? app.listen(PORT) : console.log("ENV PORT missing");
}

export function getApp() {
  return app;
}
