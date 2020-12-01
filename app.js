import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";
import cookieParser from "cookie-parser";

import * as mongodb from "./src/config/mongodb/mongoConfig";
import * as fila from "./src/config/rabbitmq/filas";
import * as sender from "./src/config/rabbitmq/rabbitMqSender";
import usuario from "./src/modulos/usuario/routes/usuarioRoutes";
import autenticacao from "./src/modulos/usuario/routes/usuarioRoutes";

const app = express();
const token =
  "eyJhbGciOiJIUzM4NCJ9.eyJjcGYiOiIxMDMuMzI0LjU4OS01NCIsIm5vbWUiOiJWaWN0b3IgSHVnbyBOZWdyaXNvbGkiLCJpZCI6IjhjZDZkNzAzLTYwYmMtNGMyNS1hOGFlLTI3ZThjMGE4YjFiNiIsImVtYWlsIjoidmhuZWdyaXNvbGlAZ21haWwuY29tIiwiaWF0IjoxNjA2NzgzNTIwLCJleHAiOjE2MDY4MDE1MjB9.B9mep3YbIiSlbC2aLUd8HnhDUmwk80OYPlop1CIoPxOcJhk2jk1NsmWHSVgI3ql_";
const usuarioId = "8cd6d703-60bc-4c25-a8ae-27e8c0a8b1b6";
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongodb.connect();
sender.criarFila(fila.AUTENTICAR_USUARIO);
sender.criarFila(fila.DESLOGAR_USUARIO);

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(usuario);
app.use(autenticacao);

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/authenticated", (req, res) => {
  if (!req.cookies.token) {
    res.redirect("/login");
  }
  res.sendFile(__dirname + "/views/authenticated.html");
});

app.post("/api/auth/token", (req, res) => {
  console.log(req.body);
  sender.enviarParaFila({ token, usuarioId }, fila.AUTENTICAR_USUARIO);
  return res.json({
    access_token: `Bearer ${token}`,
  });
});

app.post("/api/auth/logout", (req, res) => {
  console.log(req.params.access_token);
  sender.enviarParaFila({ token, usuarioId }, fila.DESLOGAR_USUARIO);
  return res.json({ status: "Ok" });
});

const PORT = process.env.PORT || 8096;

app.listen(PORT, () => {
  console.log(`Aplicação iniciada na porta ${PORT}`);
});
