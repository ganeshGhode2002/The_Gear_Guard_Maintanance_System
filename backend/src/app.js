import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes.js";

const app = express();

// ✅ CORS (ONLY ONCE)
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello ❤️❤️❤️");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
