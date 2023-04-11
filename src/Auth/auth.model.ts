import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()

interface UserInput {
    name: string;
    role: Role;
    email: string;
    password: string;
    classId?: number;
}
interface UserUpdate {
    name?: string;
    role?: Role;
    password?: string;
    classId?: number;
}

async function addUser(userPayload: UserInput) {
    const user = await prisma.user.create({
        data: userPayload

    })

    return user
}
async function updateUser(id: number, updatePayload: UserUpdate) {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: updatePayload
    })
    return user
}
async function deleteUser(id: number) {
    const user = await prisma.user.delete({
        where: {
            id
        }
    })

    return user
}

export { addUser, updateUser, deleteUser }