import { Router } from "express";
import { upload } from "../cloudinary/config.js";
import { checkPatientOrDoctor } from "../controllers/patientOrDoctor.js";

const router = Router();

router.post(
  "/api/:id/upload",
  checkPatientOrDoctor,
  upload.single("image"),
  async (req, res) => {
    try {
      // Cloudinary URL
      const imageUrl = req.file.path;

      // check if  user exists and update the imageUrl
      if (req.user) {
        req.user.imageUrl = imageUrl;
        await req.user.save();
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
