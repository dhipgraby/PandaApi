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
        const conversationId = req.params.conversationId;
        
        if (conversationId == null || conversationId === "") {
            console.log("no conversation id");
            return res.status(404).json({ error: "conversation Id not found" });
        }

        const conversationData = await getConversation(conversationId);
        
        if (conversationData == undefined || conversationData == null) {
            res.status(200).json({ error: "No file data" });
        } else {
            res.status(200).json({ conversation: conversationData });
        }
    },

    setConversation: async (req: Request, res: Response) => {
        const conversationId = req.params.conversationId;
        const conversation = req.body.conversation;

        await setConversation(conversationId, conversation);
        res.status(200).json({ message: "Conversation updated successfully." });
    },

    getAllConversations: async (_req: Request, res: Response) => {
        const all_conversations = await getAllConversations();
        res.status(200).json({ allConversations: all_conversations });
    },

    createConversation: async (req: Request, res: Response) => {
        const conversationName = req.body.conversationName;
        const create = await createConversation(conversationName);
        res.status(200).json({ content: create.content, fileName: create.fileName });
    },

    deleteConversation: async (req: Request, res: Response) => {
        const conversationId = req.params.conversationId;
        await deleteConversation(conversationId);
        res.status(200).json({ content: [], fileName: "" });
    },

    changeName: async (req: Request, res: Response) => {
        const conversationId = req.params.conversationId;
        const newName = req.body.newName;

        await changeName(conversationId, newName);
        res.status(200).json({ message: "File name changed!", status: 200 });
    },
};