"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const toriRoutes_1 = __importDefault(require("./routes/toriRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/testdb")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../src/public")));
app.use("/public", express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.use("/", toriRoutes_1.default);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../src/public/index.html"));
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("Static files are being served from:", path_1.default.join(process.cwd(), "public/images"));
});
