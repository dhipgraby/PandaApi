import request from "supertest";
import express, { Application } from "express";
import { AiRoute } from "../src/controllers/routes/AiRoute";
import { OpenAi_createCompletion } from "../models/chatStorage";

const app: Application = express();
app.use(express.json());
AiRoute(app);

describe("POST /api/ai/chat", () => {
  it("should return a comprehension result using real data", async () => {
    const question = "What is the capital of France?";
    const conversationId = "12345";

    const response = await request(app)
      .post("/api/ai/chat")
      .send({ question, conversationId });
      
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("comprehensionResult");
    expect(response.body).toHaveProperty("usage");
    expect(response.body).toHaveProperty("isNew");
    expect(response.body).toHaveProperty("docname");
  });

  // You can add more test cases with different questions and conversationIds.
});
