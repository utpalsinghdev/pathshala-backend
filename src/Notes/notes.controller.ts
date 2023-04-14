import { NextFunction, Request, RequestHandler, Response } from "express";
import * as services from "./notes.services";
import createHttpError from "http-errors";
import { Role } from "@prisma/client";

interface AuthenticatedRequest extends Request {
    payload: {
        role: Role;
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

