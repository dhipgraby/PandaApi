//conversationController.ts
import {
    deleteConversation,
    createConversation,
    getConversation,
    setConversation,
    getAllConversations,
    changeName,
} from "../../models/conversationStorage";

import { Request, Response } from "express";

export default {
    getConversation: async (req: Request, res: Response) => {
        if (!req.session.userId) return
        const conversationId = req.params.conversationId;

        if (conversationId == null || conversationId === "") {
            console.log("no conversation id");
            return res.status(404).json({ error: "conversation Id not found" });
        }

        const conversationData = await getConversation(conversationId, req.session.userId);

        if (conversationData == undefined || conversationData == null) {
            res.status(200).json({ error: "No file data" });
        } else {
            res.status(200).json({ conversation: conversationData });
        }
    },

    setConversation: async (req: Request, res: Response) => {
        if (!req.session.userId) return
        const conversationId = req.params.conversationId;
        const conversation = req.body.conversation;

        await setConversation(conversationId, conversation, req.session.userId);
        res.status(200).json({ message: "Conversation updated successfully." });
    },

    getAllConversations: async (req: Request, res: Response) => {
        if (!req.session.userId) return
        const all_conversations = await getAllConversations(req.session.userId);
        res.status(200).json({ allConversations: all_conversations });
    },

    createConversation: async (req: Request, res: Response) => {
        if (!req.session.userId) return
        const conversationName = req.body.conversationName;
        const create = await createConversation(conversationName, req.session.userId);
        res.status(200).json({ content: create.content, fileName: create.fileName });
    },

    deleteConversation: async (req: Request, res: Response) => {
        if (!req.session.userId) return
        const conversationId = req.params.conversationId;
        await deleteConversation(conversationId, req.session.userId);
        res.status(200).json({ content: [], fileName: "" });
    },

    changeName: async (req: Request, res: Response) => {
        if (!req.session.userId) return
        const conversationId = req.params.conversationId;
        const newName = req.body.newName;

        await changeName(conversationId, newName, req.session.userId);
        res.status(200).json({ message: "File name changed!", status: 200 });
    },
};