import express from "express";
import { upload } from "../middleware/multer";
import { getOffers, uploadOffer } from "../controllers/toriController";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadOffer);

router.get("/get", getOffers);

export default router;
