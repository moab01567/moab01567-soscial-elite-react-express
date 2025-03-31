import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  APIArticle,
  ApiArticlePOST,
} from "../../shared/ArticlesInterfaceAndEnum";
import request from "supertest";
import {
  APIReactionAndUser,
  APIReactionCounter,
  APIReactionPOST,
  ReactionsEmoji,
} from "../../shared/ReactionsInterfaceAndEnum";
import { getApp } from "../server";
const app = getApp();

//the test database already have 2 user, with id 1 and 2. user 2 is publisher

describe("Testing all get article endpoints and reaction test endpoint", () => {
  const generatedArticles: APIArticle[] = [];
  const allReactionAndUsers: APIReactionAndUser[][] = [];
  beforeAll(async () => {
    for (let i = 1; i < 4; i++) {
      const body: ApiArticlePOST = {
        userId: "2",
        title: "title" + i,
        text: "1 2 3 4 5 6 7 8 9 10",
      };
      const res = await request(app).post("/api/article").send(body);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("articleId");
      generatedArticles.push(res.body);
    }
  });

  it("POST /api/reaction should return 201 and Created ", async () => {
    for (let generatedArticle of generatedArticles) {
      const body: APIReactionPOST = {
        userId: "1",
        articleId: generatedArticle.articleId,
        reactionEmoji: ReactionsEmoji.HART,
      };
      const res = await request(app).post("/api/reaction").send(body);
      expect(res.statusCode).toBe(201);
    }
  });

  it("GET /api/article/anonymous should return 200 ", async () => {
    const res = await request(app).get("/api/article/anonymous");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(3);
  });

  it("GET /api/reactions/:articleId should return 200 ", async () => {
    for (let generatedArticle of generatedArticles) {
      const res = await request(app).get(
        "/api/reactions/" + generatedArticle.articleId,
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      const reactionAndUsers: APIReactionAndUser[] = res.body;
      expect(reactionAndUsers[0].user.userId).toBe("1");
      allReactionAndUsers.push(reactionAndUsers);
    }
  });
  it("PUT /api/reaction/:reactionId/:reaction should return 204", async () => {
    for (let reactionAndUser of allReactionAndUsers) {
      const res = await request(app).put(
        "/api/reaction/" +
          reactionAndUser[0].reaction.reactionId +
          "/" +
          ReactionsEmoji.LAUGHING,
      );
      expect(res.statusCode).toBe(204);
    }
  });

  it("GET /api/reactions/counter/:articleId should return 200 ", async () => {
    for (let generatedArticle of generatedArticles) {
      const res = await request(app).get(
        "/api/reactions/counter/" + generatedArticle.articleId,
      );
      expect(res.statusCode).toBe(200);
      const reactionCounter: APIReactionCounter = res.body;
      expect(reactionCounter.reaction[ReactionsEmoji.HART]).toBe(0);
      expect(reactionCounter.reaction[ReactionsEmoji.LAUGHING]).toBe(1);
      expect(reactionCounter.reaction[ReactionsEmoji.THUMBS_UP]).toBe(0);
    }
  });
  it("GET /api/article/reaction/:userId should return 200 ", async () => {
    for (let generatedArticle of generatedArticles) {
      const res = await request(app).get("/api/article/reaction/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      const reactionCounter: APIArticle[] = res.body;
      expect(reactionCounter).toHaveLength(3);
    }
  });
  it("DELETE /api/reaction/:reactionId should return 204 ", async () => {
    for (let reactionAndUser of allReactionAndUsers) {
      const res = await request(app).delete(
        "/api/reaction/" + reactionAndUser[0].reaction.reactionId,
      );
      expect(res.statusCode).toBe(204);
      const reactionAndUsers = await request(app).get(
        "/api/reactions/" + reactionAndUser[0].reaction.articleId,
      );
      expect(reactionAndUsers.body).toBeInstanceOf(Array);
      expect(reactionAndUsers.body).toHaveLength(0);
    }
  });

  afterAll(async () => {
    for (const article of generatedArticles) {
      const res = await request(app).delete(
        "/api/article/" + article.articleId,
      );
      expect(res.statusCode).toBe(204);
    }
  });
});
