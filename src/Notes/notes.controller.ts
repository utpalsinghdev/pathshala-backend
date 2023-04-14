import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, RequestHandler, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import env from "../utils/validateEnv"


cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: env.CLOUDINARY_CLOUD_API_SECRET
});




export async function createPost(req :Request, res : Response, next : NextFunction) {
    const { name, prompt, photo } = req.body;
    try {

        console.log("started");
        const photoRes = await cloudinary.uploader.upload(photo);
        console.log("uploaded");
        if (photoRes) {
            console.log(photoRes.secure_url);

        }
        res.status(201).json({ success: true, message: "Image Uploaded SuccessFully 🔥", data: photoRes.secure_url });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });

    }
}

