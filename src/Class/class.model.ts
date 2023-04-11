import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function addClass(name: string) {
    const newClass = await prisma.class.create({
        data: {
            name
        }

    })

    return { class: newClass }
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

async function updateClass(id: number, name: string) {
    const updatedCLass = await prisma.class.update({
        where: {
            class_id: id
        },
        data: {
            name
        }
    })
    return { class: updatedCLass }
}
async function deleteClass(id: number) {
    const deleteClass = await prisma.class.delete({
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

    return { class: deleteClass }
}


export { addClass, getAllClass, updateClass, deleteClass }