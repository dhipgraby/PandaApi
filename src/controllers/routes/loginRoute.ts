import { Application } from "express";
import { loginUser, getLoggedInUser } from "../loginController";

export const loginRoute = (app: Application): void => {
  app.post("/api/login", loginUser);
  app.get("/api/user", getLoggedInUser);
};