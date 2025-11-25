import expres from "express";
import { getUser, login, logout, signUp } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.js";
let routes = expres.Router();

routes.post("/signup", signUp);
routes.post("/login", login);
routes.get("/logout", logout);
routes.get("/", authMiddleware, getUser);


export default routes;
