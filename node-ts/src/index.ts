import express, {Request, Response} from "express";

const app = express();

const PORT = process.env.PORT;

console.log({ PORT })

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, TypeScript with Docker!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

 