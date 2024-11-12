import "@/jobs/consult-weather";
import dotenv from "dotenv";
import express, { Express } from "express";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import { connect } from "./config/cache";
import weatherRouter from "./routes/weather.route";

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

const file = fs.readFileSync(path.resolve(process.cwd(), "./docs/doc.yml"), "utf8");
const doc = YAML.parse(file);

app.use(express.json());

app.use("/api", swaggerUi.serve, swaggerUi.setup(doc));

app.use("/api/weather", weatherRouter);

export async function startServer() {
  connect();
  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
}
