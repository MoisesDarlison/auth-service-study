import request from "supertest";
import { app } from "../config/app";

describe("Content Type Middleware", () => {
  it("Should return default content type as JSON", async () => {
    app.get("/test_content_type", (req, res) => res.send());

    await request(app)
      .get("/test_content_type")
      .send()
      .expect("content-type", /json/);
  });
});
