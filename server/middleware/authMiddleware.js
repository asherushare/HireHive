import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'

// Middleware ( Protect Company Routes )
export const protectCompany = async (req,res,next) => {

    // Getting Token From Headers
    const token = req.headers.token

    
    if (!token) {
        return res.status(401).json({ success:false, message:'Not authorized, Login Again'})
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success:false, message:'Server configuration error'})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const company = await Company.findById(decoded.id).select('-password')

        if (!company) {
            return res.status(401).json({ success:false, message:'Company not found'})
        }

        req.company = company
        next()

    } catch (error) {
        return res.status(401).json({success:false, message: error.message || 'Invalid token'})
    }

}