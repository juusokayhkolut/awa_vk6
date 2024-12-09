import { Request, Response } from "express";
import { Offer } from "../models/Offer";
import { Image } from "../models/Image";
import path from "path";

export const uploadOffer = async (req: Request, res: Response) => {
  try {
    const { title, price, description } = req.body;

    if (!title || !price || !description) {
      alert("Title, price and description is required")
      return;
    }

    let imageId = null;

    if (req.file) {
      const newImage = new Image({
        filename: req.file.filename,
        path: path.join("public/images", req.file.filename),
      });

      const savedImage = await newImage.save();
      imageId = savedImage._id;
    }

    const newOffer = new Offer({
      title,
      price,
      description,
      imageId,
    });

    await newOffer.save();

    res.status(201).json({
      message: "Offer uploaded successfully.",
      offer: newOffer,
    });
  } catch (error) {
    console.error("Error uploading offer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getOffers = async (req: Request, res: Response) => {
  try {
    const offers = await Offer.find();

    const offersWithImages = await Promise.all(
      offers.map(async (offer) => {
        const image = offer.imageId ? await Image.findById(offer.imageId) : null;

        return {
          title: offer.title,
          price: offer.price,
          description: offer.description,
          imagePath: image ? image.path : null,
        };
      })
    );

    res.status(200).json(offersWithImages);
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};