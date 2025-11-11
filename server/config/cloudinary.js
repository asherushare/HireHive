import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
    try {
        if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
            console.warn('⚠️  WARNING: Cloudinary credentials are not set. File uploads will fail!');
            return;
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });

        console.log('✅ Cloudinary configured successfully');
    } catch (error) {
        console.error('❌ Failed to configure Cloudinary:', error.message);
    }
}

export default connectCloudinary