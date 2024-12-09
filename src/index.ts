import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import todoRoutes from "./routes/toriRoutes";

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../src/public")));

app.use("/public", express.static(path.join(process.cwd(), "public")));

app.use("/", todoRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Static files are being served from:", path.join(process.cwd(), "public/images"));
});
