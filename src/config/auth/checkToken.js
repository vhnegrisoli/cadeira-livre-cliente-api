import jwt from "jsonwebtoken";
import { promisify } from "util";

import * as config from "../secrets";

const BEARER_PATTERN = "Bearer ";
const VAZIO = "";
const ENDPOINTS_PERMITIDOS = [
  "/api/auth/token",
  "/api/auth/check-token",
  "/api/usuarios/novo",
];

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (ENDPOINTS_PERMITIDOS.includes(req.url)) {
    return next();
  }
  if (!authorization) {
    return res.status(401).json({ message: "Não autenticado." });
  }
  let token = recuperarTokenDoHeader(authorization);
  try {
    await setarUsuarioDoTokenNoRequest(token);
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Não foi possível processar seu token." });
  }

  function recuperarTokenDoHeader(authorization) {
    if (authorization.includes(BEARER_PATTERN)) {
      return authorization.replace(BEARER_PATTERN, VAZIO);
    }
    return authorization;
  }

  async function setarUsuarioDoTokenNoRequest(token) {
    const dadosToken = await promisify(jwt.verify)(
      token,
      config.APPLICATION_SECRET
    );
    const { id, nome, email, cpf } = dadosToken;
    req.usuarioAutenticado = { id, nome, email, cpf };
  }
};
