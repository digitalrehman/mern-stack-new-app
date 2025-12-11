import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { createNews, deleteNews, getNews, updateNews } from "../controller/news.controller.js";
import upload from "../config/multer.js";
const newsRoutes = express.Router();

newsRoutes.post("/create", upload.single("file"), authMiddleware, createNews);
newsRoutes.get("/", authMiddleware, getNews);
newsRoutes.put("/update/:id", authMiddleware, updateNews);
newsRoutes.delete("/delete/:id", authMiddleware, deleteNews);

export default newsRoutes;