const swaggerAutogen = require("swagger-autogen")();

const documentacaoConfig = {
  info: {
    title: "Cadeira Livre Cliente API",
    description: "API REST do aplicativo SaloonB - Clientes",
  },
  host: `localhost:${process.env.PORT || 8096}`,
  schemes: ["http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, documentacaoConfig);
