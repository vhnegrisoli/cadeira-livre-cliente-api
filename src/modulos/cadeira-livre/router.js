import { Router } from "express";
import axios from "axios";

import * as endpoints from "../../config/endpoints";

const router = Router();

router.get("/api/cadeiras-livres-disponiveis", async (req, res) => {
  let endpointCadeirasLivresDisponiveis =
    endpoints.ENDPOINT_CADEIRAS_LIVRES_DISPONIVEIS;
  let { empresaId } = req.query;
  let { authorization } = req.headers;
  let token = authorization.split(" ")[1];
  endpointCadeirasLivresDisponiveis = endpointCadeirasLivresDisponiveis.replace(
    "{token}",
    token
  );
  endpointCadeirasLivresDisponiveis = empresaId
    ? endpointCadeirasLivresDisponiveis.replace("{empresaId}", empresaId)
    : endpointCadeirasLivresDisponiveis.replace("{empresaId}", "");
  var dados = null;
  await axios
    .get(endpointCadeirasLivresDisponiveis)
    .then((data) => {
      dados = data.data;
    })
    .catch((error) => {
      dados = error;
    });
  return res.json(dados);
});

export default router;
