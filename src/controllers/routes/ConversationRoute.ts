import { Application } from "express";
import conversationController from "../conversationController";
import { attachUserId } from "../../../middleware/attachUserId"

export const ConversationRoute = (app: Application): void => {

    app.get("/api/conversations", attachUserId, conversationController.getAllConversations);
    app.post("/api/conversations", attachUserId, conversationController.createConversation);
    app.get("/api/conversations/:conversationId", attachUserId, conversationController.getConversation);
    app.put("/api/conversations/:conversationId", attachUserId, conversationController.setConversation);
    app.delete("/api/conversations/:conversationId", attachUserId, conversationController.deleteConversation);
    app.post("/api/conversations/:conversationId/name", attachUserId, conversationController.changeName);
};
