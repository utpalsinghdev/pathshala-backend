import { Router } from "express";
import { addNotes } from "./notes.controller";

const router = Router();

router.post("/add/:id", addNotes);

export default router;