// TallaRoutes.mjs
import { Router } from "express";
import { TallaController } from "../controllers/TallaController.mjs";
import { authenticateEmployed } from "../middlewares/middleware.mjs";

class TallaRoutes {
  constructor() {
    this.router = Router();
    this.controller = new TallaController();

    this.router.route("/").get(
        authenticateEmployed,
        this.controller.getAll);
  }
}

export { TallaRoutes };
