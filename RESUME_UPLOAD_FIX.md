# 🔧 Resume Upload Not Working - Fix Guide

## Problem
The "Save" button for resume upload is showing a **500 Internal Server Error**.

## Root Cause
The most common cause is **missing Cloudinary environment variables** in Vercel.

## ✅ Step-by-Step Fix

### Step 1: Check Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **backend project** (`hire-hive-backend-final`)
3. Go to **Settings** → **Environment Variables**
4. Check if these variables are set:
   - `CLOUDINARY_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_SECRET_KEY`

### Step 2: Add Cloudinary Credentials (If Missing)

1. Get your Cloudinary credentials from [Cloudinary Dashboard](https://cloudinary.com/console)
2. In Vercel, add these environment variables:
   ```
   CLOUDINARY_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_SECRET_KEY=your-secret-key
   ```
3. **⚠️ IMPORTANT:** After adding variables, you MUST **Redeploy** your project
   - Go to **Deployments** tab
   - Click the **three dots** (⋯) on the latest deployment
   - Click **Redeploy**

### Step 3: Check Vercel Logs

1. Go to Vercel Dashboard → Your Backend Project
2. Click on **Logs** tab
3. Try uploading a resume
4. Look for error messages like:
   - `❌ Cloudinary credentials not configured`
   - `❌ Cloudinary upload error`
   - `Error in updateUserResume`

### Step 4: Verify the Fix

1. After redeploying, try uploading a resume again
2. Check the browser console (F12) for detailed logs
3. The button should show "Uploading..." while processing
4. You should see a success message when done

## 🐛 Common Issues & Solutions

### Issue 1: "File upload service is not configured"
**Solution:** Cloudinary environment variables are not set. Follow Step 2 above.

### Issue 2: "Function execution timed out"
**Cause:** Vercel free tier has a 10-second timeout limit.
**Solutions:**
- **Option A:** Upgrade to Vercel Pro ($20/month) for 60-second timeout
- **Option B:** Compress your PDF before uploading (reduce file size)
- **Option C:** Use a smaller file for testing (< 1MB)

### Issue 3: "Server error" (500 error)
**Solutions:**
1. Check Vercel logs for specific error messages
2. Verify all environment variables are set correctly
3. Make sure you redeployed after adding variables
4. Check if MongoDB is connected (should work if other features work)

### Issue 4: Button doesn't do anything
**Solutions:**
1. Check browser console (F12) for errors
2. Make sure you selected a file before clicking Save
3. Check if you're logged in
4. Verify the backend URL is correct

## 🔍 Debugging Steps

### 1. Check Browser Console
1. Open browser console (F12)
2. Try uploading a resume
3. Look for error messages
4. Check the Network tab for the API request

### 2. Check Backend Logs
1. Go to Vercel Dashboard → Your Project → Logs
2. Filter by "update-resume" or "resume"
3. Look for error messages
4. The logs should show:
   - `📤 Resume upload request received`
   - `📁 File received: {...}`
   - `☁️ Uploading to Cloudinary...`
   - `✅ Cloudinary upload successful`

### 3. Test Health Endpoint
Try accessing: `https://hire-hive-backend-final.vercel.app/`
- Should return: "API is running..."

### 4. Test with Small File
1. Try uploading a very small PDF (< 100KB)
2. If small file works, the issue is likely timeout
3. If small file fails, the issue is likely configuration

## 📋 Checklist

- [ ] Cloudinary environment variables set in Vercel
- [ ] All three Cloudinary variables are set (NAME, API_KEY, SECRET_KEY)
- [ ] Backend redeployed after adding variables
- [ ] Checked Vercel logs for errors
- [ ] Tested with small file (< 1MB)
- [ ] Browser console shows no errors
- [ ] User is logged in
- [ ] File is selected before clicking Save

## 🚀 Quick Test

1. **Select a PDF file** (preferably small, < 1MB)
2. **Click "Save" button**
3. **Check browser console** (F12) for logs
4. **Check Vercel logs** for backend errors
5. **Look for error messages** in the toast notification

## 📞 Still Not Working?

If the issue persists after following all steps:

1. **Share the error message** from:
   - Browser console
   - Vercel logs
   - Toast notification

2. **Check these:**
   - Are you using the correct Vercel project?
   - Are environment variables set for the correct environment (Production)?
   - Did you redeploy after adding variables?
   - Is the file size under 5MB?
   - Is the file type PDF or image?

3. **Common mistakes:**
   - Forgot to redeploy after adding variables
   - Wrong Cloudinary credentials
   - Environment variables set for wrong environment
   - File too large for free tier timeout

## 💡 Additional Tips

- **Use small files for testing** (< 1MB)
- **Check Vercel plan** - Free tier has 10-second timeout
- **Verify Cloudinary account** is active
- **Test with different browsers** to rule out browser issues
- **Clear browser cache** if issues persist

---

**Most likely fix:** Set Cloudinary environment variables in Vercel and redeploy! 🎯

