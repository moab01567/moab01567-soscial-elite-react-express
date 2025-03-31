import { describe, expect, it } from "vitest";
import request from "supertest";
import { APIMessage, APIUsers } from "../../shared/interface";
import { getApp } from "../server";

//the test database already have 2 user, with id 1 and 2. user 2 is publisher
const app = getApp();

describe("API GET User", () => {
  it("GET /api/user/:userId return 200 and APIArticle", async () => {
    const res = await request(app).get("/api/user/1");
    expect(res.statusCode).toBe(200);
    const user: APIUsers = res.body;
    expect(user).toHaveProperty("userId");
    expect(user.userId).toBe("1");
  });

  it("GET /api/user return 200 and APIUser if in database", async () => {
    const res = await request(app)
      .get("/api/user")
      .set("Cookie", ["LoginToken=1"]);
    expect(res.statusCode).toBe(200);
    const user: APIUsers = res.body;
    expect(user).toHaveProperty("userId");
    expect(user.userId).toBe("1");
  });
  it("GET /api/user return 401 and You are not AUTHORIZED", async () => {
    const res = await request(app)
      .get("/api/user")
      .set("Cookie", ["LoginToken=0"]);
    expect(res.statusCode).toBe(401);
    const message: APIMessage = res.body;
    expect(message).toHaveProperty("displayMessage");
    expect(message.displayMessage).toBe("You are not AUTHORIZED");
  });

  it("GET /api/user return 401 and Please login ", async () => {
    const res = await request(app).get("/api/user");
    expect(res.statusCode).toBe(401);
    const message: APIMessage = res.body;
    expect(message).toHaveProperty("displayMessage");
    expect(message.displayMessage).toBe("Please login");
  });
});
