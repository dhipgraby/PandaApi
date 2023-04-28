import { Application } from "express";
import { getUserById } from '../userController';

export const userRoute = (app: Application): void => {    
    app.get('/api/users/:userId', getUserById);
};