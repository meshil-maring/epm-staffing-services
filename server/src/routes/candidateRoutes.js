import express from "express";
import multer from "multer";

import { uploadPdfController } from "../util/controller.js";
import { searchCandidateController } from "../controller/candidate.controller.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Base: api/candidates
router.post("/upload/pdf", (req, res, next) => {
  upload.single("pdf")(req, res, (err) => {
    if (err?.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, message: "File too large. Maximum size is 10 MB." });
    }
    if (err) return res.status(500).json({ success: false, message: "File upload failed." });
    uploadPdfController(req, res);
  });
});

router.get("/search/candidate-name", searchCandidateController);

export default router;
