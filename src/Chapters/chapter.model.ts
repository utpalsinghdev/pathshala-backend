import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()
export interface updatePayload {
    name: string;
    classId?: number;
}
export interface addPayload {
    name: string;
    classId: number;
    
}
async function addChapter(Payload: addPayload) {
    const chapter = await prisma.chapter.create({
        data: Payload,
        include: {
            Class: true
        }


    })

    return chapter
}
async function getAllChaptersByClassId(id: number) {
    const chapters = await prisma.chapter.findMany(
        {
            where: {
                classId: id
            },
            include: {
                Class: true
            }

        }
    )

    return chapters
}
async function getAllChaptersById(id: number) {
    const chapters = await prisma.chapter.findUnique(
        {
            where: {
                chapter_id: id
            },
            include: {
                Class: true
            }


        }
    )

    return chapters
}
async function getAllChapters() {
    const chapters = await prisma.chapter.findMany({
        include: {
            Class: true
        }

    }

    )

    return chapters
}



async function getChapterByName(name: string) {
    const chapter = await prisma.chapter.findUnique({
        where: {
            name: name
        }
    })
    return chapter

}


async function updateChapter(id: number, updatePayload: updatePayload) {
    const chapter = await prisma.chapter.update({
        where: {
            chapter_id: id
        },
        include: {
            Class: true
        },

        data: updatePayload
    })
    return chapter
}

async function deleteChapter(id: number) {
    const user = await prisma.chapter.delete({
        where: {
            chapter_id: id
        }
    })

    return user
}


export { addChapter, updateChapter, deleteChapter, getAllChapters, getAllChaptersByClassId, getChapterByName, getAllChaptersById }