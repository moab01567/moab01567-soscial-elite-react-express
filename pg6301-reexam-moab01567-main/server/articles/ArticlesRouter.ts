import { Router } from "express";
import * as articleService from "./ArticleService";
import { checkException } from "../HttpException";
import { APIMessage } from "../../shared/interface";
import {
  ApiArticlePOST,
  ApiArticlePUT,
} from "../../shared/ArticlesInterfaceAndEnum";

export function ArticlesRouter() {
  const router = Router();

  router.get("/api/article/anonymous", async (req, res) => {
    try {
      res.send(await articleService.getAnonymousArticles());
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });
  router.get("/api/article", async (req, res) => {
    try {
      res.send(await articleService.getArticles());
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });
  router.get("/api/article/:userId", async (req, res) => {
    try {
      const userId: string = req.params.userId;
      res.send(await articleService.getArticlesByUserId(userId));
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });
  router.get("/api/article/reaction/:userId", async (req, res) => {
    try {
      const userId: string = req.params.userId;
      res.send(await articleService.getArticlesByUserReaction(userId));
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });

  router.post("/api/article", async (req, res) => {
    try {
      const postArticle: ApiArticlePOST = req.body;
      res.send(await articleService.createArticle(postArticle));
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });

  router.put("/api/article/:articleId", async (req, res) => {
    try {
      const putArticle: ApiArticlePUT = req.body;
      const articleId: string = req.params.articleId;
      res.status(204);
      res.send(await articleService.updateArticle(articleId, putArticle));
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });

  router.delete("/api/article/:articleId", async (req, res) => {
    try {
      const articleId: string = req.params.articleId;
      const apiMessage = await articleService.deleteArticle(articleId);
      res.status(204);
      res.send(apiMessage);
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });

  return router;
}
