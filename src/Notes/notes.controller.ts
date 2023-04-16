import { NextFunction, Request, RequestHandler, Response } from "express";
import * as services from "./notes.services";
import createHttpError from "http-errors";
import { Role } from "@prisma/client";

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
        const note = await services.addNotes(req.body);
        res.status(201).json({ success: true, message: "Notes Uploaded SuccessFully ", data: note });
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))

    }
}

export async function AllNotes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const classId = req.payload.classId
        const notes = await services.getAllNotes(null);
        res.status(200).json({ success: true, message: "All Notes Fetched", data: notes });
    } catch (error) {
        next(createHttpError(error.statusCode || 500, error.message))

    }
}

