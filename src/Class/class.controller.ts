import { NextFunction, Request, Response } from 'express';
import * as classServices from './class.services'
import createHttpError from 'http-errors';
import { Role } from '@prisma/client';
interface AuthenticatedRequest extends Request {
    payload: {
        role: Role;
    };
}
async function createClass(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }


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
        next(createHttpError(error.statusCode || 500, error.message))
    }
}
async function updateClass(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }

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
        next(createHttpError(error.statusCode || 500, error.message))
    }
}
async function removeClass(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }

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
        next(createHttpError(error.statusCode || 500, error.message))
    }
}

async function getAllClass(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }

        const allClass = await classServices.getAllClasses()

        if (allClass) {
            res.status(200).json({
                success: true,
                message: "All Classes Fetched",
                data: allClass
            })
        }

    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))
    }
}
async function getOneClass(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }
        const id = parseInt(req.params.id)
        const allClass = await classServices.getOneClass(id)

        if (allClass) {
            res.status(200).json({
                success: true,
                message: "Class Fetched",
                data: allClass
            })
        }

    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))
    }
}




export { createClass, getAllClass, updateClass, removeClass,getOneClass }