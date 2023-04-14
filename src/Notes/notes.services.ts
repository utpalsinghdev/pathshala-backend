import { getAllChaptersById } from '../Chapters/chapter.model';
import { getClassById } from '../Class/class.model';
import { throwHttpError } from '../utils/utils';
import * as model from './notes.model';
import { v2 as cloudinary } from "cloudinary";
import env from "../utils/validateEnv"


cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: env.CLOUDINARY_CLOUD_API_SECRET
});


interface AddNote {
    name: string;
    notesBase64: string;
    chapterId?: number;
    classId?: number;
}

async function addNotes(payload: AddNote) {
    var publicId = "Pathshala/";

    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());

    const formattedDate = `${day} ${month} ${year}`;



    if (payload.classId) {
        const Class = await getClassById(payload.classId);

        if (!Class) {
            throwHttpError(404, 'Class not found');
        }

        publicId += `${Class.name}/`;
    }

    if (payload.chapterId) {
        const chapter = await getAllChaptersById(payload.chapterId);

        if (!chapter) {
            throwHttpError(404, 'Chapter not found');
        }

        publicId += `${chapter.name}/`;
    }




    publicId += `${payload.name}_${formattedDate}`;

    console.log(publicId)
    const photoRes = await cloudinary.uploader.upload(payload.notesBase64,
        {
            folder: "notes",
            public_id: publicId,
            resource_type: "auto"
        });


    return model.AddNotes({
        name: payload.name,
        link: photoRes.secure_url,
        chapterId: payload.chapterId ? payload.chapterId : undefined,
        classId: payload.classId ? payload.classId : undefined
    });
}


export { addNotes }