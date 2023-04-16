import { Router } from "express";
import { AllNotes, createPost } from "./notes.controller";
import { verify } from "../utils/verifyToken";
const router = Router();

router.post("/add", verify, createPost);
router.get("/", verify, AllNotes);


export default router;