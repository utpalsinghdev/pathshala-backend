import { NextFunction, Request, RequestHandler, Response } from "express";
import * as services from "./notes.services";
import createHttpError from "http-errors";
import { Role } from "@prisma/client";
import { AllDeletedNotes } from "./notes.model";
import { NotesUpdateSchema, addNOte } from "../utils/schema";

interface AuthenticatedRequest extends Request {
    payload: {
        role: Role;
        classId?: number;
    };
}

export async function createPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }
        const { error } = addNOte.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false, message: error.message
            })
        }
        const note = await services.addNotes(req.body);
        res.status(201).json({ success: true, message: "Notes Uploaded SuccessFully ", data: note });
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))

    }
}
export async function UpdatePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }
        const { error } = NotesUpdateSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                success: false, message: error.message
            })
        }
        const note_id = Number(req.params.id)
        const note = await services.updateNotes(note_id, req.body);
        res.status(201).json({ success: true, message: "Notes Updated SuccessFully ", data: note });
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))

    }
}

export async function AllNotes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }
        const classId = req.payload.classId
        const notes = await services.getAllNotes(classId);
        res.status(200).json({ success: true, message: "All Notes Fetched", data: notes });
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))

    }
}
export async function AllDEletedNotes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }
        const classId = req.payload.classId
        const notes = await AllDeletedNotes();
        res.status(200).json({ success: true, message: "All Notes Fetched", data: notes });
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))

    }
}

export async function deleteNotes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        if (req.payload.role !== Role.ADMIN) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not authorized to access this operation' });
        }
        const note_id = Number(req.params.id)
        const notes = await services.deleteNote(note_id, true);
        res.status(200).json({ success: true, message: "Notes Deleted Successfully", data: notes });
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))

    }
}



