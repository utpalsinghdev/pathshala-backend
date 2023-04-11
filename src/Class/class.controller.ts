import { Request, Response } from 'express';
import * as classServices from './class.services'

async function createClass(req: Request, res: Response): Promise<void> {
    try {
        const { name } = req.body

        const newClass = await classServices.addClass(name)
        if (newClass) {
            res.status(201).json({
                success: true,
                message: "New Class is added",
                data: newClass
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
async function updateClass(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id)
        const { name } = req.body

        const updatedClass = await classServices.updateClass(id, name)
        if (updatedClass) {
            res.status(200).json({
                success: true,
                message: "class updated successfully",
                data: updatedClass
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
async function removeClass(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id)

        const deleteClass = await classServices.deleteClass(id)
        if (deleteClass) {
            res.status(202).json({
                success: true,
                message: "class deleted successfully",
                data: deleteClass
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getAllClass(req: Request, res: Response): Promise<void> {
    try {

        const allClass = await classServices.getAllClasses()
        if (allClass) {
            res.status(200).json({
                success: true,
                message: "All Classes Fetched",
                data: allClass
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}




export { createClass, getAllClass, updateClass,removeClass }