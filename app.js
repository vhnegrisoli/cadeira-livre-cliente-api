import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";
import cookieParser from "cookie-parser";

import * as mongodb from "./src/config/mongodb/mongoConfig";
import * as fila from "./src/config/rabbitmq/filas";
import * as rabbitMq from "./src/config/rabbitmq/rabbitMqSender";
import usuario from "./src/modulos/usuario/routes/usuarioRoutes";
import autenticacao from "./src/modulos/auth/routes/authRoutes";
import checkToken from "./src/config/auth/checkToken";

const app = express();
const PORT = process.env.PORT || 8096;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongodb.connect();
rabbitMq.criarFilas();

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(autenticacao);
app.use(checkToken);
app.use(usuario);

app.listen(PORT, () => {
  console.log(`Aplicação iniciada na porta ${PORT}`);
});
