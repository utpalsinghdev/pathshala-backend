import * as chapterModel from './chapter.model';
import { updatePayload, addPayload } from './chapter.model';
import { getClassById } from '../Class/class.model';
import { throwHttpError } from '../utils/utils';

async function addChapter(Payload: addPayload) {
    const getClass = await getClassById(Payload.classId);

    if (!getClass) {
        throwHttpError(404, "Class not Found");
    }

    const getChapter = await chapterModel.getChapterByName(Payload.name);

    if (getChapter?.name === Payload.name && getChapter?.classId === Payload.classId) {
        throwHttpError(409, "Chapter already exists");
    }

    return chapterModel.addChapter(Payload);
}

async function updateChapter(id: number, Payload: updatePayload) {
    const { name, classId } = await chapterModel.getAllChaptersById(id) || {};

    const getClass = await getClassById(Payload.classId);


    if (!getClass) {
        throwHttpError(404, "Class not Found");
    }

    if (!name) {
        throwHttpError(404, "Chapter not Found");
    }

    const chapterName = await chapterModel.getChapterByName(Payload.name);

    if (chapterName && (chapterName.name !== name || chapterName.classId !== classId)) {
        throwHttpError(409, "Chapter already exists");
    }




    return chapterModel.updateChapter(id, Payload);
}

async function deleteChapter(id: number) {
    const chapter = await chapterModel.getAllChaptersById(id);

    if (!chapter) {
        throwHttpError(404, "Chapter not Found");
    }

    return chapterModel.deleteChapter(id);
}

async function allChapters(id?: number) {
    return id ? chapterModel.getAllChaptersByClassId(id) : chapterModel.getAllChapters();
}

export { addChapter, updateChapter, allChapters, deleteChapter };
