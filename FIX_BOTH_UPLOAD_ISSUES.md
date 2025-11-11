# 🔧 Fix Both Upload Issues - Resume & Company Registration

## Problem
Both **resume upload** and **company registration** are failing with **500 Internal Server Error**.

## Root Cause
**Missing Cloudinary environment variables** in Vercel. Both features require Cloudinary to upload files (resumes and company logos).

## ✅ Solution: Set Cloudinary Environment Variables in Vercel

### Step 1: Get Cloudinary Credentials

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Sign in or create a free account
3. Go to **Dashboard** → You'll see your credentials:
   - **Cloud Name** (e.g., `your-cloud-name`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### Step 2: Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **backend project** (`hire-hive-backend-final`)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** and add these three variables:

   **Variable 1:**
   - **Key:** `CLOUDINARY_NAME`
   - **Value:** Your Cloudinary cloud name
   - **Environment:** Production, Preview, Development (select all)

   **Variable 2:**
   - **Key:** `CLOUDINARY_API_KEY`
   - **Value:** Your Cloudinary API key
   - **Environment:** Production, Preview, Development (select all)

   **Variable 3:**
   - **Key:** `CLOUDINARY_SECRET_KEY`
   - **Value:** Your Cloudinary API secret
   - **Environment:** Production, Preview, Development (select all)

5. **⚠️ CRITICAL:** After adding variables, you MUST **Redeploy**
   - Go to **Deployments** tab
   - Click the **three dots** (⋯) on the latest deployment
   - Click **Redeploy**
   - Wait for deployment to complete (2-3 minutes)

### Step 3: Verify the Fix

1. **Test Resume Upload:**
   - Login as a user
   - Go to Applications page
   - Select a PDF file
   - Click "Save"
   - Should see success message

2. **Test Company Registration:**
   - Click "Recruiter Sign Up"
   - Fill in company details
   - Upload company logo
   - Click "Create account"
   - Should register successfully

## 🔍 How to Check if Cloudinary is Configured

### Method 1: Check Vercel Logs

1. Go to Vercel Dashboard → Your Backend Project
2. Click **Logs** tab
3. Look for these messages:
   - ✅ `✅ Cloudinary configured successfully` = Configured
   - ❌ `⚠️ WARNING: Cloudinary credentials are not set` = Not configured

### Method 2: Check Backend Response

After redeploying, the backend will check Cloudinary configuration and return appropriate error messages if not configured.

## 🐛 Common Issues & Solutions

### Issue 1: "File upload service is not configured"
**Cause:** Cloudinary environment variables are missing or incorrect.
**Solution:**
1. Verify all three Cloudinary variables are set in Vercel
2. Check variable names are exact: `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`
3. Make sure you redeployed after adding variables
4. Verify credentials are correct (no extra spaces)

### Issue 2: "Cloudinary authentication failed"
**Cause:** Invalid Cloudinary credentials.
**Solution:**
1. Double-check your Cloudinary credentials
2. Make sure you copied the correct values
3. Verify your Cloudinary account is active
4. Try regenerating API secret in Cloudinary dashboard

### Issue 3: "Function execution timed out"
**Cause:** Vercel free tier has 10-second timeout limit.
**Solutions:**
- **Option A:** Upgrade to Vercel Pro ($20/month) for 60-second timeout
- **Option B:** Compress files before uploading (reduce file size)
- **Option C:** Use smaller files for testing (< 1MB)

### Issue 4: Still getting 500 error after setting variables
**Solutions:**
1. **Check if you redeployed** - Variables only take effect after redeploy
2. **Check Vercel logs** - Look for specific error messages
3. **Verify variable names** - Must be exact: `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`
4. **Check environment** - Make sure variables are set for "Production" environment
5. **Verify credentials** - Test credentials in Cloudinary dashboard

## 📋 Complete Environment Variables Checklist

Make sure these are set in Vercel:

### Required for File Uploads:
- ✅ `CLOUDINARY_NAME`
- ✅ `CLOUDINARY_API_KEY`
- ✅ `CLOUDINARY_SECRET_KEY`

### Required for Database:
- ✅ `MONGODB_URI`

### Required for Authentication:
- ✅ `CLERK_SECRET_KEY` (Production key: `sk_live_...`)
- ✅ `CLERK_WEBHOOK_SECRET` (for webhooks)

### Required for JWT:
- ✅ `JWT_SECRET` (any random string)

### Optional but Recommended:
- ✅ `FRONTEND_URL` (your Vercel frontend URL)
- ✅ `PORT` (usually 5000)

## 🚀 Quick Test Steps

### Test 1: Resume Upload
1. Login as user
2. Go to Applications page
3. Select a PDF file (< 5MB)
4. Click "Save"
5. Check browser console (F12) for logs
6. Should see success message

### Test 2: Company Registration
1. Click "Recruiter Sign Up"
2. Enter company name, email, password
3. Upload company logo (image file, < 5MB)
4. Click "Create account"
5. Check browser console (F12) for logs
6. Should register and redirect to dashboard

## 🔍 Debugging Steps

### 1. Check Browser Console
1. Open browser console (F12)
2. Try uploading file
3. Look for error messages
4. Check Network tab for API request/response

### 2. Check Vercel Logs
1. Go to Vercel Dashboard → Your Backend Project
2. Click **Logs** tab
3. Try uploading file
4. Look for error messages:
   - `❌ Cloudinary credentials not configured`
   - `❌ Cloudinary upload error`
   - `Error in updateUserResume` or `Error in registerCompany`

### 3. Verify Cloudinary Account
1. Go to Cloudinary Dashboard
2. Check if account is active
3. Verify you can upload files manually
4. Check account limits (free tier has limits)

## 💡 Important Notes

1. **Redeploy is Required:** After adding environment variables, you MUST redeploy for them to take effect.

2. **Variable Names Matter:** Variable names must be exact (case-sensitive):
   - ✅ `CLOUDINARY_NAME` (correct)
   - ❌ `cloudinary_name` (wrong)
   - ❌ `CLOUDINARY-NAME` (wrong)

3. **Environment Selection:** When adding variables, select all environments (Production, Preview, Development) unless you have a specific reason not to.

4. **Free Tier Limits:** 
   - Cloudinary free tier: 25 GB storage, 25 GB bandwidth/month
   - Vercel free tier: 10-second function timeout

5. **File Size Limits:** 
   - Maximum file size: 5MB (enforced in code)
   - Recommended: < 1MB for faster uploads

## 📞 Still Not Working?

If the issue persists after following all steps:

1. **Share these details:**
   - Error message from browser console
   - Error message from Vercel logs
   - Screenshot of Vercel environment variables (hide sensitive values)

2. **Check these:**
   - Are you using the correct Vercel project?
   - Did you redeploy after adding variables?
   - Are variable names correct?
   - Are credentials correct?
   - Is Cloudinary account active?

3. **Common mistakes:**
   - Forgot to redeploy after adding variables
   - Wrong variable names
   - Wrong credentials
   - Variables set for wrong environment
   - Extra spaces in variable values

## 🎯 Summary

**The fix is simple:**
1. Get Cloudinary credentials
2. Add them to Vercel environment variables
3. **Redeploy** your backend
4. Test both features

**Most common issue:** Forgetting to redeploy after adding environment variables!

---

**After completing these steps, both resume upload and company registration should work! 🎉**

