import { Router } from "express";
import AuthController from "../controller/authController";

const router = new Router();

router.post("/api/auth/token", AuthController.autenticarUsuario);
router.post("/api/auth/logout", AuthController.autenticarUsuario);
router.get("/api/auth/usuario-autenticado", AuthController.autenticarUsuario);
router.get("/api/auth/check-token", AuthController.autenticarUsuario);

export default router;
