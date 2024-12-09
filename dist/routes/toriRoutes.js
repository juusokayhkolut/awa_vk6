"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middleware/multer");
const toriController_1 = require("../controllers/toriController");
const router = express_1.default.Router();
router.post("/upload", multer_1.upload.single("image"), toriController_1.uploadOffer);
router.get("/get", toriController_1.getOffers);
exports.default = router;
