import express from "express"
import cors from "cors";

const app = express()

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello ❤️❤️❤️")
})


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;