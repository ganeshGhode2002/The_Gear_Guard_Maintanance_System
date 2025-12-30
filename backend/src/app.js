import express from "express"
import cors from "cors";

const app = express()
import routes from "./routes.js";
// Middlewares
app.use(cors());
app.use(express.json());



app.use("/api", routes);


app.get("/", (req, res) => {
    res.send("Hello ❤️❤️❤️")
})


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;