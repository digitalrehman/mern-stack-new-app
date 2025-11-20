import expres from "express";
import { getUser } from "../controller/user.controller.js";
let routes = expres.Router();

routes.get("/", getUser);

export default routes;
