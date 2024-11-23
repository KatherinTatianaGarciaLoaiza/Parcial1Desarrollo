// ColorRoutes.mjs
import { Router } from "express";
import { ColorController } from "../controllers/ColorController.mjs";
import { authenticateEmployed } from "../middlewares/middleware.mjs";

class ColorRoutes {
  constructor() {
    this.router = Router();
    this.controller = new ColorController();

    this.router.route("/").get(
        authenticateEmployed,
        this.controller.getAll);
  }
}

export { ColorRoutes };
