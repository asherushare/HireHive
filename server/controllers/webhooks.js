import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage clerk user with database
const clerkWebhooks = async (req, res) => {
  try {
    // Check if webhook secret is configured
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      console.error('CLERK_WEBHOOK_SECRET is not configured');
      return res.status(500).json({ 
        success: false, 
        message: 'Webhook secret not configured' 
      });
    }

    // Create a svix instance with clerk webhook secret
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Get webhook headers
    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];

    // Check if required headers are present
    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('Missing webhook headers:', { svixId, svixTimestamp, svixSignature });
      return res.status(400).json({ 
        success: false, 
        message: 'Missing webhook headers' 
      });
    }

    // Verifying headers
    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });

    // Getting the data request body
    const { data, type } = req.body;

    console.log(`Webhook received: ${type} for user: ${data?.id}`);

    //switch case for diff. events
    switch (type) {
      case "user.created": {
        try {
          // Check if user already exists (prevent duplicates)
          const existingUser = await User.findById(data.id);
          if (existingUser) {
            console.log(`User ${data.id} already exists, skipping creation`);
            return res.json({ success: true, message: 'User already exists' });
          }

          const userData = {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address || '',
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'User',
            image: data.image_url || '',
            resume: "",
          };

          await User.create(userData);
          console.log(`User created successfully: ${data.id}`);
          res.json({ success: true });
        } catch (error) {
          console.error('Error creating user in webhook:', error);
          // If user creation fails, don't fail the webhook (Clerk will retry)
          res.status(500).json({ 
            success: false, 
            message: 'Failed to create user',
            error: error.message 
          });
        }
        break;
      }

      case "user.updated": {
        try {
          const userData = {
            email: data.email_addresses?.[0]?.email_address || '',
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'User',
            image: data.image_url || '',
          };
          await User.findByIdAndUpdate(data.id, userData, { new: true });
          console.log(`User updated successfully: ${data.id}`);
          res.json({ success: true });
        } catch (error) {
          console.error('Error updating user in webhook:', error);
          res.status(500).json({ 
            success: false, 
            message: 'Failed to update user',
            error: error.message 
          });
        }
        break;
      }

      case "user.deleted": {
        try {
          await User.findByIdAndDelete(data.id);
          console.log(`User deleted successfully: ${data.id}`);
          res.json({ success: true });
        } catch (error) {
          console.error('Error deleting user in webhook:', error);
          res.status(500).json({ 
            success: false, 
            message: 'Failed to delete user',
            error: error.message 
          });
        }
        break;
      }
      default:
        console.log(`Unhandled webhook type: ${type}`);
        res.json({ success: true, message: 'Webhook received but not handled' });
        break;
    }
  } catch (error) {
    console.error('Webhook error:', error.message);
    console.error('Webhook error stack:', error.stack);
    // Return 200 to prevent Clerk from retrying invalid requests
    // but log the error for debugging
    res.status(200).json({ 
      success: false, 
      message: "Webhook processing error",
      error: error.message 
    });
  }
};


export default clerkWebhooks;
