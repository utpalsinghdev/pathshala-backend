import { Response } from 'express';
import { Request as ExpressRequest } from "express";

interface RequestWithFile extends ExpressRequest {
    file: any;
    body : any;
}
export const addNotes = async (req: RequestWithFile, res: Response) => {
    try {
        const file = req.file;
        const body = req.body;
        // const result = await cloudinary.v2.uploader.upload(file.path);
        // const link = result.secure_url;
        console.log(file)
        console.log(body)
        res.status(200).json({
            message: "thank you"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}