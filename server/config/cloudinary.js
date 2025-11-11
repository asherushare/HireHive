// import { v2 as cloudinary } from 'cloudinary'

// const connectCloudinary = async () => {

//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_SECRET_KEY
//     })

// }

// export default connectCloudinary



import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    // Support both naming conventions for flexibility
    const cloudName = process.env.CLOUDINARY_NAME || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_SECRET_KEY || process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.warn("⚠️  WARNING: Cloudinary credentials are not set. File uploads will fail!");
      return;
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    console.log("✅ Cloudinary Connected");
  } catch (error) {
    console.error("❌ Failed to configure Cloudinary:", error.message);
  }
};

export default connectCloudinary;
