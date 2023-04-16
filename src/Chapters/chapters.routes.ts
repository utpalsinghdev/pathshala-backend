import { Router } from "express";
import { createChapter, updateChapter, getAllChapters, removeChapter, getOneChapter } from './chpater.controller'
import { verify } from "../utils/verifyToken";
const router = Router();

//Admin Routes Only
router.post("/add", verify, createChapter);
router.put("/update/:id", verify, updateChapter);
router.delete("/delete/:id", verify, removeChapter);

//Admin and Student Routes
router.get("/one/:id", verify, getOneChapter);
router.get("/:id", verify, getAllChapters);
router.get("/", verify, getAllChapters);


export default router;