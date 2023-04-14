import { Router } from "express";
import {  createPost } from "./notes.controller";
import { verify } from "../utils/verifyToken";
const router = Router();

router.post("/add", verify,createPost);


export default router;