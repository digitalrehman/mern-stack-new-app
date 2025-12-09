import express from "express";
import { createCategory, getAllCategory, updateCategory, deleteCategory } from "../controller/category.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/create", authMiddleware, createCategory);
categoryRoutes.get("/", authMiddleware, getAllCategory);
categoryRoutes.put("/update/:id", authMiddleware, updateCategory);
categoryRoutes.delete("/delete/:id", deleteCategory);

export default categoryRoutes;