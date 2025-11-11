import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"

// Get User Data
export const getUserData = async (req, res) => {

    const userId = req.auth?.userId

    if (!userId) {
        return res.status(401).json({ success: false, message: 'User not authenticated' })
    }

    try {

        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: 'User Not Found' })
        }

        res.json({ success: true, user })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}


// Apply For Job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body

    if (!jobId) {
        return res.json({ success: false, message: 'Job ID is required' })
    }

    const userId = req.auth?.userId

    if (!userId) {
        return res.status(401).json({ success: false, message: 'User not authenticated' })
    }

    try {

        const isAlreadyApplied = await JobApplication.findOne({ jobId, userId })

        if (isAlreadyApplied) {
            return res.json({ success: false, message: 'Already Applied' })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({ success: false, message: 'Job Not Found' })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: 'Applied Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get User Applied Applications Data
export const getUserJobApplications = async (req, res) => {

    try {

        const userId = req.auth?.userId

        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' })
        }

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        // Return empty array instead of error if no applications
        return res.json({ success: true, applications: applications || [] })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Update User Resume
export const updateUserResume = async (req, res) => {
    try {

        const userId = req.auth?.userId

        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' })
        }

        const resumeFile = req.file

        if (!resumeFile) {
            return res.json({ success: false, message: 'No resume file provided' })
        }

        const userData = await User.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        }

        // ✅ Upload from memory buffer (Vercel-safe)
        const base64 = `data:${resumeFile.mimetype};base64,${resumeFile.buffer.toString("base64")}`;
        const resumeUpload = await cloudinary.uploader.upload(base64, {
            resource_type: 'auto',
            folder: 'resumes'
        })
        
        userData.resume = resumeUpload.secure_url
        await userData.save()

        return res.json({ success: true, message: 'Resume Updated' })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}