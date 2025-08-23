import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAll);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

export default router;
