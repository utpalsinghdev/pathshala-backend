import createHttpError from 'http-errors';
import * as services from './chapter.services'
import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';
import { chapterSchema } from '../utils/schema';
interface AuthenticatedRequest extends Request {
    payload: {
        role: Role;
        classId: string;
    };
}

async function createChapter(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }

        const {error } = chapterSchema.validate(req.body)

        if (error) {
            return next(createHttpError(400, error.message))
        }

        const newChapter = await services.addChapter(req.body)

        if (newChapter) {
            res.status(201).json({
                success: true,
                message: "New Chapter is added",
                data: newChapter
            })
        }

    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))
    }
}

async function updateChapter(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this resource' });
        }

        

        const id = parseInt(req.params.id)

        const {error } = chapterSchema.validate(req.body)

        if (error) {
            return next(createHttpError(400, error.message))
        }

        const newChapter = await services.updateChapter(id, req.body)

        if (newChapter) {
            res.status(200).json({
                success: true,
                message: "Chapter is updated successfully",
                data: newChapter
            })
        }
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))
    }
}

async function removeChapter(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this resource' });
        }

        const id = parseInt(req.params.id)

        const deleteClass = await services.deleteChapter(id)

        if (deleteClass) {
            res.status(202).json({
                success: true,
                message: "Chapter deleted successfully",
                data: deleteClass
            })
        }
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))
    }
}

async function getAllChapters(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {

        const id = parseInt(req.payload.classId)

        const chapters = await services.allChapters(id)

        if (chapters) {
            res.status(200).json({
                success: true,
                message: "All Chapter fetched successfully",
                data: chapters
            })
        }
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))
    }
}
async function getOneChapter(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {

        const id = parseInt(req.params.id)

        const chapters = await services.getOneChapter(id)

        if (chapters) {
            res.status(200).json({
                success: true,
                message: "Chapter fetched successfully",
                data: chapters
            })
        }
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))
    }
}

export {
    createChapter, getAllChapters, removeChapter, updateChapter,getOneChapter
}

