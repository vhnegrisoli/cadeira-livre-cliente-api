import { Router } from "express";

import CadeiraLivreController from "../controller/cadeiraLivreContoller";

const router = Router();

router.get(
  "/api/cadeiras-livres-disponiveis",
  CadeiraLivreController.buscarCadeirasLivresDisponiveis
);

export default router;
