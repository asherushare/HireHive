import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
    try {

        if (!process.env.CLERK_WEBHOOK_SECRET) {
            console.error("CLERK_WEBHOOK_SECRET is not set");
            return res.status(500).json({ success: false, message: 'Webhook secret not configured' });
        }

        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Get raw body for verification
        const rawBody = req.rawBody || JSON.stringify(req.body);

        // Verifying Headers
        await whook.verify(rawBody, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // Getting Data from request body
        const { data, type } = req.body

        // Switch Cases for differernt Events
        switch (type) {
            case 'user.created': {
                if (!data.email_addresses || data.email_addresses.length === 0) {
                    return res.status(400).json({ success: false, message: 'No email address provided' });
                }

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: (data.first_name || '') + " " + (data.last_name || '').trim() || 'User',
                    image: data.image_url || '',
                    resume: ''
                }
                await User.create(userData)
                return res.json({ success: true })
            }

            case 'user.updated': {
                if (!data.email_addresses || data.email_addresses.length === 0) {
                    return res.status(400).json({ success: false, message: 'No email address provided' });
                }

                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: (data.first_name || '') + " " + (data.last_name || '').trim() || 'User',
                    image: data.image_url || '',
                }
                await User.findByIdAndUpdate(data.id, userData)
                return res.json({ success: true })
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                return res.json({ success: true })
            }
            default:
                return res.json({ success: true, message: 'Event type not handled' })
        }

    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(400).json({ success: false, message: error.message })
    }
}