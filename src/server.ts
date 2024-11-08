import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World my friends");
});

export async function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
}
