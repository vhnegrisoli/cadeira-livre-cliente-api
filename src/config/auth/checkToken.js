import jwt from "jsonwebtoken";
import { promisify } from "util";

import * as config from "../secrets";

const BEARER_PATTERN = "Bearer ";
const VAZIO = "";

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Não autenticado." });
  }
  let token = null;
  if (authorization.includes(BEARER_PATTERN)) {
    token = authorization.replace(BEARER_PATTERN, VAZIO);
  } else {
    token = authorization;
  }
  try {
    const dadosToken = await promisify(jwt.verify)(
      token,
      config.APPLICATION_SECRET
    );
    req.usuarioAutenticado = dadosToken.usuarioAutenticado;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Não foi possível processar seu token." });
  }
};
