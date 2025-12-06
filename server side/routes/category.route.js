import express from "express";
import { createCategory, getAllCategory, updateCategory, deleteCategory } from "../controller/category.controller.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/create", createCategory);
categoryRoutes.get("/", getAllCategory);
categoryRoutes.put("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);

export default categoryRoutes;