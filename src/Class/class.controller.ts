import { NextFunction, Request, Response } from 'express';
import * as classServices from './class.services'
import createHttpError from 'http-errors';

async function createClass(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        next(createHttpError(error.statusCode, error.message))
    }
}
async function updateClass(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        next(createHttpError(error.statusCode, error.message))
    }
}
async function removeClass(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        next(createHttpError(error.statusCode, error.message))
    }
}

async function getAllClass(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        next(createHttpError(error.statusCode, error.message))
    }
}




export { createClass, getAllClass, updateClass, removeClass }