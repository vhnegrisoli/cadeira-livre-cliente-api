const swaggerAutogen = require("swagger-autogen")();

const env = process.env;

const documentacaoConfig = {
  info: {
    title: "Cadeira Livre Cliente API",
    description: "API REST do aplicativo SaloonB - Clientes",
  },
  host:
    env.NODE_ENV === "development"
      ? "localhost:8096"
      : `${env.APPLICATION_HOST}`,
  schemes: [env.NODE_ENV !== "production" ? "http" : "https"],
};

const outputFile = "./swagger_output.json";
const autenticacao = "./src/modulos/auth/routes/authRoutes.js";
const usuario = "./src/modulos/usuario/routes/usuarioRoutes.js";
const cadeiraLivre = "./src/modulos/cadeiralivre/routes/cadeiraLivreRoutes.js";
const endpointsFiles = [autenticacao, usuario, cadeiraLivre];

swaggerAutogen(outputFile, endpointsFiles, documentacaoConfig);
