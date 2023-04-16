import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AddNote {
    name: string;
    link: string;
    publicId: string;
    chapterId?: number;
    classId?: number;
}


async function AddNotes(payload: AddNote) {

    const Note = await prisma.note.create({
        data: {
            name: payload.name,
            link: payload.link,
            publicId: payload.publicId,
            chapterId: payload.chapterId,
            classId: payload.classId
        }

    });

    return Note;
}

async function AllNotesByClassID(id: number) {
    const notes = await prisma.note.findMany({
        where: {
            classId: id
        },
        include: {
            Class: true,
            Chapter: true
        }
    })


    return notes
}
async function AllNotes() {
    const notes = await prisma.note.findMany({
    })


    return notes
}

export { AddNotes, AllNotes, AllNotesByClassID }