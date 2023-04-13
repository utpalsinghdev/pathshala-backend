import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function addClass(name: string) {
    const Class = await prisma.class.create({
        data: {
            name
        }

    })

    return Class
}

async function getAllClass() {
    const classes = await prisma.class.findMany({
        include: {
            Chapters: true
        }
    }
    )

    return classes
}
async function getClassById(id: number) {
    const Class = await prisma.class.findUnique({
        where: {
            class_id: id

        },
        include:{
            Chapters : true
        }
    })

    return Class

}
async function getClassByName(name: string) {
    const Class = await prisma.class.findUnique({
        where: {
            name: name

        }
    })

    return Class

}
async function updateClass(id: number, name: string) {
    const Class = await prisma.class.update({
        where: {
            class_id: id
        },
        data: {
            name
        }
    })
    return Class
}
async function deleteClass(id: number) {
    const Class = await prisma.class.delete({
        where: {
            class_id: id
        },
        include: {
            Chapters: {
                include: {
                    notes: true
                }
            },
        }
    })

    return Class
}


export { addClass, getAllClass, updateClass, deleteClass, getClassById, getClassByName }