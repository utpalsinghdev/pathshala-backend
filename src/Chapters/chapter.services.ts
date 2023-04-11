import * as chapterModel from './chapter.model'
import { updatePayload, addPayload } from './chapter.model'
import { CustomError } from '../utils/utils'
async function addChapter(Payload: addPayload) {

    const getChapter = await chapterModel.getChapterByName(Payload.name)

    if (getChapter) {
        const error: CustomError = new Error("Chapter already exists");
        error.statusCode = 409;
        throw error;
    }

    const chapter = await chapterModel.addChapter(Payload)

    return chapter
}

async function updateChapter(id: number, Payload: updatePayload) {
    const getChapter = await chapterModel.getAllChaptersById(id)
    if (!getChapter) {
        const error: CustomError = new Error("Chapter not Found");
        error.statusCode = 404;
        throw error;
    }

    const Chaptername = await chapterModel.getChapterByName(Payload.name)
    if (Chaptername) {
        const error: CustomError = new Error("Chapter already exists");
        error.statusCode = 409;
        throw error;
    }
    const chapter = await chapterModel.updateChapter(id, Payload)
    return chapter
}

async function deleteChapter(id: number) {
    const getChapter = await chapterModel.getAllChaptersById(id)
    if (!getChapter) {
        const error: CustomError = new Error("Chapter not Found");
        error.statusCode = 404;
        throw error;
    }
    const chapter = await chapterModel.deleteChapter(id)
    return chapter
}

async function allChapters(id: number) {
    if (id) {
        const chapters = await chapterModel.getAllChaptersByClassId(id)
        return chapters
    }
    const chapters = await chapterModel.getAllChapters()
    return chapters
}

export { addChapter, updateChapter, allChapters, deleteChapter }