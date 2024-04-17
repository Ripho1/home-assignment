import express, { Express, Request, Response } from "express";
import cors from "cors";
import rootRouter from "./routers/rootRouter";

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!");
});

app.use("/api", rootRouter);

app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});