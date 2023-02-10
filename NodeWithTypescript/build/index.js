import express from "express";
const app = express();
app.get("/", (req, res) => {
    res.json({ message: "Like like!!!" });
});
app.get("/hi", (req, res) => {
    res.send("Hiiiii!!!!!!!!!!!!");
});
app.listen("3001", () => {
    console.log("Server Running on 3001!");
});
