"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imagesDirectory = path_1.default.join(process.cwd(), "public/images");
if (!fs_1.default.existsSync(imagesDirectory)) {
    fs_1.default.mkdirSync(imagesDirectory, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: imagesDirectory,
    filename: (req, file, cb) => {
        const originalName = path_1.default.parse(file.originalname).name.replace(/\s+/g, '_');
        const extension = path_1.default.extname(file.originalname);
        const id = (0, uuid_1.v4)();
        const newFilename = `${originalName}_${id}${extension}`;
        cb(null, newFilename);
    },
});
exports.upload = (0, multer_1.default)({ storage });
