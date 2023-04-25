import { Application } from 'express';
import { registerRoute } from './routes/registerRoute';
import { welcomeRoute } from './routes/welcomeRoute';
import { AiRoute } from './routes/AiRoute';
import { ConversationRoute } from './routes/ConversationRoute';

export const loadApiEndpoints = (app: Application): void => {
  welcomeRoute(app);
  registerRoute(app);
  AiRoute(app)
  ConversationRoute(app);
};
