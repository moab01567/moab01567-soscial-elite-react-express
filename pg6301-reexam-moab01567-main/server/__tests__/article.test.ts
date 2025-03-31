import { afterAll, describe, expect, it } from "vitest";
import request from "supertest";
import { getApp } from "../server";
import {
  APIArticle,
  ApiArticlePOST,
  ApiArticlePUT,
} from "../../shared/ArticlesInterfaceAndEnum";
const app = getApp();
describe("Testing Creating, Updating, Get, Deleting articles", () => {
  let article: APIArticle;
  it("POST /api/article return article", async () => {
    const body: ApiArticlePOST = {
      userId: crypto.randomUUID(),
      title: "test",
      text: "1 2 3 4 5 6 7 8 9 10",
    };
    const res = await request(app).post("/api/article").send(body);
    expect(res.statusCode).toBe(200);
    article = res.body;
    expect(res.body).toHaveProperty("title");
    expect(res.body.title).toBe("test");
  });
  it("PUT /api/article/:articleId return 204", async () => {
    const body: ApiArticlePUT = {
      title: "new title",
      text: "1 2 3 4 5 6 7 8 9 10",
    };
    const res = await request(app)
      .put("/api/article/" + article.articleId)
      .send(body);
    expect(res.statusCode).toBe(204);
  });
  it("GET /api/article/:userId return 200 and APIArticle", async () => {
    const res = await request(app).get("/api/article/" + article.userId);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(1);
    article = res.body[0];
    expect(article.title).toBe("new title");
  });
  it("DELETE /api/article/:articleId return 204 and APIArticle", async () => {
    const res = await request(app).delete("/api/article/" + article.articleId);
    expect(res.statusCode).toBe(204);
    const removedArticle = await request(app).get(
      "/api/article/" + article.userId,
    );
    expect(removedArticle.statusCode).toBe(200);
    expect(removedArticle.body).toBeInstanceOf(Array);
    expect(removedArticle.body).toHaveLength(0);
  });
});

describe("Testing articles post validator should get 400", () => {
  const fakeUserId: string = crypto.randomUUID();

  it("POST /api/article should return 400 and 'Article title can not be empty' ", async () => {
    const body: ApiArticlePOST = {
      userId: fakeUserId,
      title: "",
      text: "word1 word2 word3 word4 word5 word6  word7 word8 word9 word10",
    };
    const res = await request(app).post("/api/article").send(body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("displayMessage");
    expect(res.body.displayMessage).toBe("Article title can not be empty");
  });

  it("POST /api/article should return 400 and 'You need at least 10 words in article text' ", async () => {
    const body: ApiArticlePOST = {
      userId: fakeUserId,
      title: "test",
      text: "word1 word2 word3 word4 word5 word6 word7 word8 word9",
    };
    const res = await request(app).post("/api/article").send(body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("displayMessage");
    expect(res.body.displayMessage).toBe(
      "You need at least 10 words in article text",
    );
  });

  it("POST /api/article should return 400 and 'Max character allowed in article text is 1000' ", async () => {
    const body: ApiArticlePOST = {
      userId: fakeUserId,
      title: "test",
      text: "A".repeat(1001),
    };
    const res = await request(app).post("/api/article").send(body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("displayMessage");
    expect(res.body.displayMessage).toBe(
      "Max character allowed in article text is 1000",
    );
  });
});

describe("Testing Creating More then 5 articles in one hour", () => {
  const fakeUserId: string = crypto.randomUUID();
  const generatedArticles: APIArticle[] = [];
  for (let i = 1; i < 6; i++) {
    it(
      "POST /api/article " + i + "/5 should return the created article ",
      async () => {
        const body: ApiArticlePOST = {
          userId: fakeUserId,
          title: "title " + i,
          text: "1 2 3 4 5 6 7 8 9 10",
        };
        const res = await request(app).post("/api/article").send(body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("articleId");
        generatedArticles.push(res.body);
      },
    );
  }
  it("POST /api/article 6/5 should return 400 ", async () => {
    const body: ApiArticlePOST = {
      userId: fakeUserId,
      title: "title 6",
      text: "1 2 3 4 5 6 7 8 9 10",
    };
    const res = await request(app).post("/api/article").send(body);
    expect(res.statusCode).toBe(400);
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
