import { v2 as cloudinary } from "cloudinary"
import env from "../../utils/validateEnv"

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: env.CLOUDINARY_CLOUD_API_SECRET
});

export default cloudinary;