import { Router } from "express";
import AuthController from "../controller/authController";

const router = new Router();

router.get("/api/auth/token", AuthController.autenticar);
router.get("/api/auth/logout", AuthController.autenticar);
router.get("/api/auth/usuario-autenticado", AuthController.autenticar);
router.get("/api/auth/check-token", AuthController.autenticar);

export default router;
