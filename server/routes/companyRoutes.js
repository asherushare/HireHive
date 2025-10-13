import express, { Router } from'express'
import { registerCompany, loginCompany, ChangeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, postJob } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'

const router = express.Router()

//Register a company
router.post('/register', upload.single('image'), registerCompany)


//Company login
router.post('/login', loginCompany)


//Get company data
router.get('/company', protectCompany, getCompanyData)


//post a job
router.post('/post-job', protectCompany, postJob)


//get applicants data of company
router.get('/applicants', protectCompany, getCompanyJobApplicants)


//get company job list
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)


// change the applications status
router.post('/change-status', protectCompany, ChangeJobApplicationsStatus)


// Change the applications Visibility
router.post('/change-visibility', protectCompany, changeVisibility)


export default router;