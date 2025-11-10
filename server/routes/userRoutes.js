import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'

const router = express.Router()

//Get user data

router.get('/user', getUserData)


// Apply for a job
router.post('/apply', applyForJob)


// get applied jobs data
router.get('/applications', getUserJobApplications)


// Update the user profile(resume)
router.post('/update-resume', upload.single('resume'), updateUserResume)
    

export default router