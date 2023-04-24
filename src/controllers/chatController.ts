import { Request, Response } from "express";
import { OpenAi_createCompletion } from "../../models/chatStorage";

interface ReqBody {
    question: string;
    conversationId: string;
}

async function createCompletion(req: Request, res: Response): Promise<void> {
    try {
        const { question, conversationId } = req.body as ReqBody;
        let prompt = question;
        
        const openAiResponse = await OpenAi_createCompletion(prompt, question, conversationId);

        res.status(200).json({
            comprehensionResult: openAiResponse.answer,
            usage: openAiResponse.usage,
            isNew: openAiResponse.isNew,
            docname: openAiResponse.docname,
        });
    } catch (error) {
        console.error("Error comprehending code:", error);
        res.status(500).json({ error: "Error comprehending code" });
    }
}

export default createCompletion;
