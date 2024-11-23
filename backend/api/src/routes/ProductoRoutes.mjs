// ProductoRoutes.mjs
import { Router } from "express";
import { body } from "express-validator";
import { ProductoController } from "../controllers/ProductoController.mjs";
import { authenticateEmployed } from "../middlewares/middleware.mjs";

class ProductoRoutes {
  constructor() {
    this.router = Router();
    this.controller = new ProductoController();

    this.router
      .route("/")
      .get(
        authenticateEmployed,
        this.controller.getAll)
      .post(
        authenticateEmployed,
        [
          body("name_product").trim().notEmpty(),
          body("category_product").trim().notEmpty(),
          body("price_product").isFloat({ gt: 0 }),
        ],
        this.controller.createProducto
      );

    this.router
      .route("/:id")
      .put(
        authenticateEmployed,
        [
          body("name_product").optional().trim().notEmpty(),
          body("category_product").optional().trim().notEmpty(),
          body("price_product").optional().isFloat({ gt: 0 }),
        ],
        this.controller.updateProducto
      )
      .delete(
        authenticateEmployed,
        this.controller.deleteProducto);
  }
}

export { ProductoRoutes };
