import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";
import cookieParser from "cookie-parser";

import * as mongodb from "./src/config/mongodb/mongoConfig";
import * as rabbitMq from "./src/config/rabbitmq/rabbitMqSender";
import usuario from "./src/modulos/usuario/routes/usuarioRoutes";
import autenticacao from "./src/modulos/auth/routes/authRoutes";
import cadeirasLivres from "./src/modulos/cadeira-livre/router";
import checkToken from "./src/config/auth/checkToken";

const env = process.env;
const app = express();
const PORT = env.PORT || 8096;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(checkToken);

mongodb.connect();
rabbitMq.inicializarRabbitMQ();

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(autenticacao);
app.use(usuario);
app.use(cadeirasLivres);

app.listen(PORT, () => {
  console.log(
    `Aplicação iniciada na porta ${PORT} no ambiente: ${env.NODE_ENV}`
  );
});
