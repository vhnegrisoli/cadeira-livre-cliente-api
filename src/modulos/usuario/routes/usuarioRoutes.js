import { Router } from "express";
import UsuarioController from "../controller/usuarioController";

const router = new Router();

router.post("/api/usuarios/novo");
router.get("/api/usuarios", UsuarioController.buscarTodos);

export default router;
