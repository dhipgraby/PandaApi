import { Application } from "express";
import conversationController from "../conversationController";

export const ConversationRoute = (app: Application): void => {
    app.get("/api/conversations", conversationController.getAllConversations);
    app.post("/api/conversations", conversationController.createConversation);
    app.get("/api/conversations/:conversationId", conversationController.getConversation);
    app.put("/api/conversations/:conversationId", conversationController.setConversation);
    app.delete("/api/conversations/:conversationId", conversationController.deleteConversation);
    app.post("/api/conversations/:conversationId/name", conversationController.changeName);
};
