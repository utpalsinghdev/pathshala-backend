import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AddNote {
    name: string;
    link: string;
    chapterId?: number;
    classId?: number;
}


async function AddNotes(payload: AddNote) {

    const Note = await prisma.note.create({
        data:
            payload

    });

    return Note;
}

export { AddNotes}