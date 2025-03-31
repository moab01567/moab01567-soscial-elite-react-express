import { Router } from "express";
import {
  checkException,
  HTTP_SERVER_ERROR,
  HttpException,
} from "../HttpException";
import * as reactionService from "./ReactionService";
import { APIMessage } from "../../shared/interface";
import {
  APIReactionPOST,
  ReactionsEmoji,
} from "../../shared/ReactionsInterfaceAndEnum";
export function ReactionRouter() {
  const router = Router();

  router.get("/api/reactions/counter/:articleId", async (req, res) => {
    try {
      res.send(await reactionService.getReactionCounter(req.params.articleId));
    } catch (error) {
      const apiMessage: APIMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });
  router.get("/api/reactions/:articleId", async (req, res) => {
    try {
      res.send(
        await reactionService.getReactionsByArticleId(req.params.articleId),
      );
    } catch (error) {
      const apiMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });

  router.post("/api/reaction", async (req, res) => {
    try {
      const newReaction: APIReactionPOST = req.body;
      await reactionService.postNewReaction(newReaction);
      const body: APIMessage = {
        ok: true,
        displayMessage: "It was created",
        status: 201,
        massage: "Created",
      };
      res.status(body.status);
      res.send(body);
    } catch (error) {
      const apiMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });
  router.delete("/api/reaction/:reactionId", async (req, res) => {
    try {
      const reactionId: string = req.params.reactionId;
      await reactionService.deleteReaction(reactionId);
      res.status(204);
      res.send("");
    } catch (error) {
      const apiMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });

  router.put("/api/reaction/:reactionId/:reaction", async (req, res) => {
    try {
      const reactionId: string = req.params.reactionId;
      const reactionsEmoji: ReactionsEmoji = Number.parseInt(
        req.params.reaction,
      );
      await reactionService.putReaction(reactionId, reactionsEmoji);
      res.status(204);
      res.send("");
    } catch (error) {
      const apiMessage = checkException(error);
      res.status(apiMessage.status);
      res.send(apiMessage);
    }
  });

  return router;
}
