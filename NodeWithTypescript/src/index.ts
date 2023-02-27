import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Like like!!!" });
});

app.get("/hi", (req: Request, res: Response) => {
  res.send("Hiiiii!!!!!!!!!!!!");
});

app.listen("3001", () => {
  console.log("Server Running on 3001!");
});
