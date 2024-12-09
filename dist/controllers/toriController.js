"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffers = exports.uploadOffer = void 0;
const Offer_1 = require("../models/Offer");
const Image_1 = require("../models/Image");
const path_1 = __importDefault(require("path"));
const uploadOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, description } = req.body;
        if (!title || !price || !description) {
            alert("Title, price and description is required");
            return;
        }
        let imageId = null;
        if (req.file) {
            const newImage = new Image_1.Image({
                filename: req.file.filename,
                path: path_1.default.join("public/images", req.file.filename),
            });
            const savedImage = yield newImage.save();
            imageId = savedImage._id;
        }
        const newOffer = new Offer_1.Offer({
            title,
            price,
            description,
            imageId,
        });
        yield newOffer.save();
        res.status(201).json({
            message: "Offer uploaded successfully.",
            offer: newOffer,
        });
    }
    catch (error) {
        console.error("Error uploading offer:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.uploadOffer = uploadOffer;
const getOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield Offer_1.Offer.find();
        const offersWithImages = yield Promise.all(offers.map((offer) => __awaiter(void 0, void 0, void 0, function* () {
            const image = offer.imageId ? yield Image_1.Image.findById(offer.imageId) : null;
            return {
                title: offer.title,
                price: offer.price,
                description: offer.description,
                imagePath: image ? image.path : null,
            };
        })));
        res.status(200).json(offersWithImages);
    }
    catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.getOffers = getOffers;
