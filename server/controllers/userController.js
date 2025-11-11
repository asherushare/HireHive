import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import{v2 as cloudinary} from 'cloudinary'
import Job from "../models/Job.js"



// Get user data

export const getUserData = async(req, res) => {
    try {
        // Check if user is authenticated
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({
                success: false, 
                message: 'Authentication required. Please login again.'
            });
        }

        const userId = req.auth.userId;

        const user = await User.findById(userId);

        if(!user){
            return res.json({
                success: false, 
                message: 'User Not Found. Please contact support if you just registered.'
            });
        }

        res.json({success: true, user});

    } catch(error){
        console.error('Error in getUserData:', error);
        res.status(500).json({
            success: false, 
            message: error.message || 'Failed to fetch user data'
        });
    }
}


// apply for a job
export const applyForJob = async(req, res) => {
    try {
        // Check if user is authenticated
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({
                success: false, 
                message: 'Authentication required. Please login to apply for jobs.'
            });
        }

        const {jobId} = req.body;
        const userId = req.auth.userId;

        if(!jobId){
            return res.status(400).json({
                success: false, 
                message: 'Job ID is required'
            });
        }

        // Check if user exists in database
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false, 
                message: 'User not found. Please complete your registration.'
            });
        }

        const isAlreadyApplied = await JobApplication.find({jobId, userId});

        if(isAlreadyApplied.length > 0){
            return res.json({
                success: false, 
                message: 'You have already applied for this job'
            });
        }

        const jobData = await Job.findById(jobId);

        if(!jobData){
            return res.status(404).json({
                success: false, 
                message: 'Job Not Found'
            });
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        });

        res.json({
            success: true, 
            message:'Applied Successfully'
        });

    } catch(error){
        console.error('Error in applyForJob:', error);
        res.status(500).json({
            success: false, 
            message: error.message || 'Failed to apply for job'
        });
    }
}


//Get user applied applications
export const getUserJobApplications = async (req, res) => {
    try{
        // Check if user is authenticated
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({
                success: false, 
                message: 'Authentication required. Please login again.'
            });
        }

        const userId = req.auth.userId;

        const applications = await JobApplication.find({userId})
        .populate('companyId', 'name email image')
        .populate('jobId', 'title description location category level salary')
        .exec();

        // Return empty array if no applications (not an error)
        return res.json({
            success: true, 
            applications: applications || []
        });

    } catch(error){
        console.error('Error in getUserJobApplications:', error);
        return res.status(500).json({
            success: false, 
            message: error.message || 'Failed to fetch applications'
        });
    }
}


// Update user profile(resume)
export const updateUserResume = async (req, res) => {
    try{
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({
                success: false, 
                message: 'Authentication required. Please login again.'
            });
        }

        const userId = req.auth.userId;
        const resumeFile = req.file;

        if(!resumeFile){
            return res.status(400).json({
                success: false, 
                message: 'Resume file is required'
            });
        }

        const userData = await User.findById(userId);

        if(!userData){
            return res.status(404).json({
                success: false, 
                message: 'User not found. Please complete your registration.'
            });
        }

        if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                message: 'File upload service is not configured. Please contact support.'
            });
        }

        // Upload to Cloudinary using buffer (memory storage)
        const base64Data = resumeFile.buffer.toString('base64');
        const dataURI = `data:${resumeFile.mimetype};base64,${base64Data}`;
        
        const uploadResult = await cloudinary.uploader.upload(dataURI, {
            resource_type: 'auto',
            folder: 'resumes'
        });

        userData.resume = uploadResult.secure_url;
        await userData.save();

        return res.json({
            success: true, 
            message: 'Resume Updated Successfully'
        });

    } catch(error){
        console.error('Error in updateUserResume:', error);
        res.status(500).json({
            success: false, 
            message: error.message || 'Failed to update resume. Please try again.'
        });
    }
}