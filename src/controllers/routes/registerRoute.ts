import { Application } from 'express';
import { registerUser } from '../userController';

export const registerRoute = (app: Application): void => {
    app.post('/api/register', registerUser);    
};
