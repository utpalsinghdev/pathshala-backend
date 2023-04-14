import cloudinary from "./cloudnary.config";
// 
interface NotesUploadResult {
  secureUrl: string;
  publicId: string;
}

async function uploadNotesToCloudinary(
  file : string
){
  const photoRes = await cloudinary.uploader.upload(file);

    return {
        secureUrl: photoRes.secure_url,
        publicId: photoRes.public_id,
    } as NotesUploadResult;
}

export default uploadNotesToCloudinary;
