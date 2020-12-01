import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";
import amqp from "amqplib/callback_api";
import cookieParser from "cookie-parser";

const app = express();
const token =
  "eyJhbGciOiJIUzM4NCJ9.eyJjcGYiOiIxMDMuMzI0LjU4OS01NCIsIm5vbWUiOiJWaWN0b3IgSHVnbyBOZWdyaXNvbGkiLCJpZCI6IjhjZDZkNzAzLTYwYmMtNGMyNS1hOGFlLTI3ZThjMGE4YjFiNiIsImVtYWlsIjoidmhuZWdyaXNvbGlAZ21haWwuY29tIiwiaWF0IjoxNjA2NzgzNTIwLCJleHAiOjE2MDY4MDE1MjB9.B9mep3YbIiSlbC2aLUd8HnhDUmwk80OYPlop1CIoPxOcJhk2jk1NsmWHSVgI3ql_";
const usuarioId = "8cd6d703-60bc-4c25-a8ae-27e8c0a8b1b6";
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
  enviarMensagemAutenticacaoUsuario(
    JSON.stringify({ token, usuarioId }),
    "autenticar-usuario.queue"
  );
  return res.json({
    access_token: `Bearer ${token}`,
  });
});

app.post("/api/auth/logout", (req, res) => {
  console.log(req.params.access_token);
  enviarMensagemAutenticacaoUsuario(
    JSON.stringify({ token, usuarioId }),
    "deslogar-usuario.queue"
  );
  return res.json({ status: "Ok" });
});

function enviarMensagemAutenticacaoUsuario(usuarioToken, queue) {
  amqp.connect("amqp://localhost:5672", (error, connection) => {
    if (error) {
      throw error;
    }
    connection.createChannel((error, channel) => {
      if (error) {
        throw error;
      }
      channel.assertExchange("biot-admin.topic", "topic", {
        durable: true,
      });
      channel.assertQueue(queue, {
        durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(usuarioToken));
      console.log(
        `A mensagem: '${JSON.stringify(usuarioToken)}' enviada com sucesso!`
      );
    });
    setTimeout(function () {
      connection.close();
    }, 500);
  });
}

const PORT = process.env.PORT || 8096;

app.listen(PORT, () => {
  console.log(`Aplicação iniciada na porta ${PORT}`);
});
