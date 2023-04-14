import { PrismaClient } from '@prisma/client'
import { RequestHandler } from "express";
import uploadNotesToCloudinary from '../lib/Cloudnary';




export const createPost: RequestHandler = async (req, res, next) => {
    const { name, prompt, photo } = req.body;
    try {

        console.log("started")
        const photoRes = await uploadNotesToCloudinary(photo);
        console.log("uploaded")
        if(photoRes){
            console.log(photoRes.secureUrl)

        }
        
        res.status(201).json({ success: true, message: "Image Uploaded SuccessFully 🔥", data : photoRes.secureUrl })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}

