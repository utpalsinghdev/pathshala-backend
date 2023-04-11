import { Router } from "express";
import { createClass, getAllClass, removeClass, updateClass } from "./class.controller";

const router = Router();

router.post("/add", createClass);
router.get("/all", getAllClass);
router.put("/update/:id", updateClass);
router.delete("/delete/:id", removeClass);

export default router;