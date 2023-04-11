import { Router } from "express";
import { addNotes } from "./notes.controller";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "uploads/" });
router.post("/add/:id", upload.single("formData"), addNotes);

export default router;