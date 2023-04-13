import { throwHttpError } from "../utils/utils"
import * as ClassModel from "./class.model"


async function addClass(name: string) {
    const Class = await ClassModel.getClassByName(name)

    if (Class) {
        throwHttpError(409, "Class Already Exists")
    }

    return ClassModel.addClass(name)
}

async function getAllClasses() {
    const classes = await ClassModel.getAllClass()

    return classes
}
async function getOneClass(id) {
    const classes = await ClassModel.getClassById(id)
    if(!classes){
        throwHttpError(404, "Class Not Found")
    }
    return classes
}

async function updateClass(id: number, name: string) {
    const ClassById = await ClassModel.getClassById(id)

    if (!ClassById) {
        throwHttpError(404, "Class not Found")
    }

    const Class = await ClassModel.getClassByName(name)

    if (Class) {
        throwHttpError(409, "Class Already Exists")
    }

    return ClassModel.updateClass(id, name)
}

async function deleteClass(id: number) {
    const ClassById = await ClassModel.getClassById(id)
    
    if (!ClassById) {
        throwHttpError(404, "Class not Found")
    }

    return ClassModel.deleteClass(id)
}

export { addClass, getAllClasses, updateClass, deleteClass,getOneClass }