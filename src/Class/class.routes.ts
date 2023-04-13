import { Router } from "express";
import { createClass, getAllClass, getOneClass, removeClass, updateClass } from "./class.controller";
import { verify } from "../utils/verifyToken";

const router = Router();

//Only Admin Route
router.get("/", verify, getAllClass);
router.get("/:id", verify, getOneClass);
router.post("/add", verify, createClass);
router.put("/update/:id", verify, updateClass);
router.delete("/delete/:id", verify, removeClass);

export default router;