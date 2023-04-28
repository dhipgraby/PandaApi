import { Application } from "express";
import { loginUser, getLoggedInUser, logoutUser } from "../loginController";

export const loginRoute = (app: Application): void => {
  app.post("/api/login", loginUser);
  app.get("/api/user", getLoggedInUser);
  app.post("/api/logout", logoutUser);
};
