import { Request, Response } from "express";
import { Application } from 'express';
import createCompletion from "../chatController";

export const AiRoute = (app: Application): void => {

    app.get('/api/ai', (req: Request, res: Response) => {
        return res.status(200).send({ message: 'welcome' });
    });
    app.post('/api/ai/chat', createCompletion);
};

