import { Router } from "express";
import { createChapter, updateChapter, getAllChapters, removeChapter } from './chpater.controller'
const router = Router();

router.post("/add", createChapter);
router.get("/all", getAllChapters);
router.put("/update/:id", updateChapter);
router.delete("/delete/:id", removeChapter);


export default router;