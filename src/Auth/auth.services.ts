import * as bcrypt from "bcryptjs"
import * as AuthModel from "./auth.model"
import { generateToken, throwHttpError } from "../utils/utils"
import { Role } from "@prisma/client"
import { getClassById } from "../Class/class.model"


async function login(email: string, password: string) {
    const user = await AuthModel.getUser(email)

    if (!user) {
        throwHttpError(404, "User not found")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        throwHttpError(401, "Invalid Credentials")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        classId: user.classId
    }

    const token = generateToken(jwtPayload)

    return {
        token,
        user
    }
}

async function register(name: string, email: string, password: string, role: string, classId: number) {
    const user = await AuthModel.getUser(email)

    if (user) {
        throwHttpError(409, "User Already Exists")
    }

    if (classId) {
        const getClass = await getClassById(classId)

        if (!getClass) {
            throwHttpError(404, "Class not found")
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const add = {
        name,
        email,
        password: hashedPassword,
        role: role as Role,
        classId: classId || null
    }

    const newUser = await AuthModel.addUser(add)

    return newUser
}


async function getAllUsers() {
    const users = await AuthModel.getAllUsers()

    return users
}

async function getUserByUniqueId(id: number) {
    const user = await AuthModel.getUserById(id)

    if (!user) {
        throwHttpError(404, "User not found")
    }

    return user
}
interface UserUpdate {
    id: number,
    name?: string;
    role?: Role;
    password?: string;
    classId?: number;
}

async function updateUser(id : number, payload: UserUpdate) {
    const user = await AuthModel.getUserById(id)

    if (!user) {
        throwHttpError(404, "user not found")
    }

    if (payload.classId) {
        const getClass = await getClassById(payload.classId)

        if (!getClass) {
            throwHttpError(404, "Class not found")
        }
    }

    if (payload.password) {
        const hashedPassword = await bcrypt.hash(payload.password, 10)
        payload.password = hashedPassword
    }

    const updatePayload = {
        name: payload.name || user.name,
        role: payload.role || user.role,
        password: payload.password || user.password,
        classId: payload.classId || user.classId
    }

    const updatedUser = await AuthModel.updateUser(id, updatePayload)

    return updatedUser
}


async function deleteUser(id: number) {
    const user = await AuthModel.getUserById(id)

    if (!user) {
        throwHttpError(404, "User not found")
    }

    const deletedUser = await AuthModel.deleteUser(id)

    return deletedUser
}

export {
    login,
    deleteUser,
    register,
    updateUser,
    getAllUsers,
    getUserByUniqueId
}