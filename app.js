import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 8096;

app.listen(PORT, () => {
  console.log(`Aplicação iniciada na porta ${PORT}`);
});
