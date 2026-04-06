import { Router } from "express";
import { categoriesController } from "../controllers/categories.controller";

const categoriesRoutes = Router();

categoriesRoutes.post("/createCategory", categoriesController.createCategory);
categoriesRoutes.get("/getCategory", categoriesController.getCategory);
categoriesRoutes.delete("/deleteCategory", categoriesController.deleteCategory);
categoriesRoutes.put("/updateCategory", categoriesController.updateCategory);

export default categoriesRoutes;
