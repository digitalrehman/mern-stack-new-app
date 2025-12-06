import expres from "express";
import { getUserById, login, logout, signUp, updateUser } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../config/multer.js";
let routes = expres.Router();

routes.post("/register", signUp);
routes.post("/login", login);
routes.get("/logout", logout);
routes.get("/getUserById/:id", authMiddleware, getUserById);
routes.put("/updateUser/:id", upload.single("image"), authMiddleware, updateUser);



export default routes;
