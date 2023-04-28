import { Application } from 'express';
import session from "express-session";
import { registerRoute } from './routes/registerRoute';
import { welcomeRoute } from './routes/welcomeRoute';
import { AiRoute } from './routes/AiRoute';
import { ConversationRoute } from './routes/ConversationRoute';
import { loginRoute } from './routes/loginRoute';
import { userRoute } from './routes/userRoute';

export const loadApiEndpoints = (app: Application): void => {
  app.use(
    session({
      secret: "your-secret-key", // Replace with a secure key
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set to true in production      
    })
  );

  welcomeRoute(app);
  registerRoute(app);
  loginRoute(app);
  userRoute(app);
  AiRoute(app)
  ConversationRoute(app);
};
