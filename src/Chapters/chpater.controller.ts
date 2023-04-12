import createHttpError from 'http-errors';
import * as services from './chapter.services'
import { NextFunction, Request, Response } from 'express';

async function createChapter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newChapter = await services.addChapter(req.body)

        if (newChapter) {
            res.status(201).json({
                success: true,
                message: "New Chapter is added",
                data: newChapter
            })
        }

    } catch (error) {
        next(createHttpError(error.statusCode, error.message))
    }
}

async function updateChapter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = parseInt(req.params.id)

        const newChapter = await services.updateChapter(id, req.body)

        if (newChapter) {
            res.status(200).json({
                success: true,
                message: "Chapter is updated successfully",
                data: newChapter
            })
        }
    } catch (error) {
        next(createHttpError(error.statusCode, error.message))
    }
}

async function removeChapter(req: Request, res: Response,next: NextFunction): Promise<void> {
    try {
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
        next(createHttpError(error.statusCode, error.message))
    }
}

async function getAllChapters(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.headers.authorization)

        const chapters = await services.allChapters(id)
        
        if (chapters) {
            res.status(200).json({
                success: true,
                message: "All Chapter fetched successfully",
                data: chapters
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {
    createChapter, getAllChapters, removeChapter, updateChapter
}

