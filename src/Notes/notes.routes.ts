import { Router } from "express";
import { AllDEletedNotes, AllNotes, UpdatePost, createPost, deleteNotes } from "./notes.controller";
import { verify } from "../utils/verifyToken";
const router = Router();

router.post("/add", verify, createPost);
router.get("/", verify, AllNotes);
router.get("/deleted", verify, AllDEletedNotes);
router.put("/:id", verify, UpdatePost);
router.delete("/:id", verify, deleteNotes);


export default router;