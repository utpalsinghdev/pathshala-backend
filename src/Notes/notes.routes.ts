import { Router } from "express";
import {  createPost } from "./notes.controller";
const router = Router();

router.post("/add", createPost);


export default router;