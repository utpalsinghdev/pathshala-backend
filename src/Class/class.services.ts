import * as ClassModel from "./class.model"


async function addClass(name: string) {
    const NewClass = await ClassModel.addClass(name)

    return NewClass

}

async function getAllClasses() {
    const classes = await ClassModel.getAllClass()

    return classes
}

async function updateClass(id: number, name: string) {
    const updatedCLass = await ClassModel.updateClass(id, name)

    return updatedCLass
}

async function deleteClass(id: number) {
    const deleteClass = await ClassModel.deleteClass(id)

    return deleteClass
}

export { addClass, getAllClasses, updateClass, deleteClass }