import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getOneUser,
    login,
    updateUser
} from './auth.controller'
import { verify } from "../utils/verifyToken";
const router = Router();

router.post("/login", login);
router.post("/register", verify, createUser);
router.get("/users", verify, getAllUsers)
router.put("/update/:id", verify, updateUser)
router.delete("/delete/:id", verify, deleteUser)
router.get("/:id", verify, getOneUser)



export default router;