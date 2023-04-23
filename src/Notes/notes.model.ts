import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AddNote {
    name: string;
    link: string;
    publicId: string;
    chapterId?: number;
    classId?: number;
}
interface Update {
    name?: string;
    link?: string;
    park?: boolean;
    publicId?: string;
    chapterId?: number;
    classId?: number;
}


async function AddNotes(payload: AddNote) {

    const Note = await prisma.note.create({
        data: {
            name: payload.name,
            link: payload.link,
            public_id: payload.publicId,
            chapterId: payload.chapterId,
        }

    });

    return Note;
}

async function AllNotesByClassID(id: number) {
    const notes = await prisma.note.findMany({
        where: {
            classId: id,
            park: false
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
        where: {
            park: false
        }
    })


    return notes
}
export async function AllDeletedNotes() {
    const notes = await prisma.note.findMany({
        where: {
            park: true
        }
    })


    return notes
}
async function getNOteBYid(id: number) {
    const notes = await prisma.note.findFirst({
        where: {
            notes_id: id,
        }
    })


    return notes
}
async function updateNOtes(id: number, payload: Update) {
    const notes = await prisma.note.update({
        where: {
            notes_id: id,
        },
        data: payload
    })


    return notes
}

export { AddNotes, AllNotes, AllNotesByClassID, getNOteBYid, updateNOtes }