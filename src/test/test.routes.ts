import { Router } from "express";
import { healthCheck } from "./test.controller";



const router = Router();


router.get("/", healthCheck);

export default router;