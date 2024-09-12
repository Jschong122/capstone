import { Router } from "express";
import { upload } from "../cloudinary/config.js";
import { checkPatientOrDoctor } from "../controllers/patientOrDoctor.js";
import mongoose from "mongoose";

const router = Router();

router.post(
  "/upload/:id",
  checkPatientOrDoctor,
  upload.single("image"),
  async (req, res) => {
    console.log("received request to upload image", req.params.id);
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      // Cloudinary URL
      const imageUrl = req.file.path;

      // check if  user exists and update the imageUrl
      if (req.user) {
        req.user.imageUrl = imageUrl;
        await req.user.save();
        //check if the imageUrl is saved
        if (!req.user.imageUrl) {
          return res.status(400).json({ message: "unable to save imageUrl" });
        }
        console.log(
          "user successfully updated imageUrl on database",
          req.user.imageUrl
        );
        res.send(req.user.imageUrl);
      } else {
        return res.status(400).json({
          message: "unable to find the user in the database. Check middleware",
        });
      }
    } catch (error) {
      console.log("error when uploading image", error);
      res.status(500).json({ message: "error when uploading image" });
    }
  }
);

export { router as imageUploadRouter };
