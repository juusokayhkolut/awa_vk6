import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const imagesDirectory = path.join(process.cwd(), "public/images");
if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: imagesDirectory,
  filename: (req, file, cb) => {
    const originalName = path.parse(file.originalname).name.replace(/\s+/g, '_');
    const extension = path.extname(file.originalname);
    const id = uuidv4();

    const newFilename = `${originalName}_${id}${extension}`;
    cb(null, newFilename);
  },
});

export const upload = multer({ storage });
