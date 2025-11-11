# 🔧 Vercel Deployment Fix for Resume Upload

## Issue
Getting **500 Internal Server Error** when trying to upload resume on Vercel.

## Root Causes

1. **Missing Cloudinary Environment Variables** (Most Likely)
   - Cloudinary credentials not set in Vercel dashboard
   - Check: Vercel Dashboard → Your Project → Settings → Environment Variables

2. **Vercel Timeout Limitations**
   - Free tier: 10 second timeout
   - Pro tier: 60 second timeout
   - Large file uploads might exceed timeout

3. **Serverless Function Configuration**
   - Need to configure `maxDuration` in `vercel.json`
   - Updated `vercel.json` to support 30-second timeout (requires Pro plan)

## ✅ Fixes Applied

### 1. Updated `server/vercel.json`
- Added `maxDuration: 30` for serverless functions
- **Note:** This requires Vercel Pro plan. Free tier is limited to 10 seconds.

### 2. Improved Error Handling
- Added detailed logging in `updateUserResume` function
- Better error messages for debugging
- Check Cloudinary configuration before upload

### 3. Optimized Upload Method
- Using base64 upload method (more reliable for serverless)
- Added timeout configuration
- Better buffer handling

## 🔧 Required Steps

### Step 1: Set Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your backend project (`hire-hive-backend-final`)
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/HireHive

# Clerk Authentication
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx  # PRODUCTION KEY
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Cloudinary (CRITICAL for file uploads)
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_SECRET_KEY=your-secret-key

# JWT Secret
JWT_SECRET=any-random-secret-string

# Frontend URL
FRONTEND_URL=https://your-frontend.vercel.app

# Port (optional for Vercel)
PORT=5000
```

5. **⚠️ IMPORTANT:** After adding variables, **Redeploy** your project

### Step 2: Check Vercel Plan

**Free Tier Limitations:**
- 10 second function timeout
- May not be enough for large file uploads

**Solutions:**
1. **Upgrade to Pro** ($20/month) - 60 second timeout
2. **Optimize file size** - Compress files before upload
3. **Use direct Cloudinary upload** - Upload from frontend directly to Cloudinary (bypasses backend)

### Step 3: Test Configuration

1. Check health endpoint: `https://hire-hive-backend-final.vercel.app/api/health`
2. Should return:
```json
{
  "status": "ok",
  "services": {
    "mongodb": "configured",
    "cloudinary": "configured",
    "clerk": "configured",
    "webhook": "configured"
  }
}
```

3. If `cloudinary` shows `"missing"`, environment variables are not set correctly.

### Step 4: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → **Logs**
2. Try uploading a resume
3. Look for error messages:
   - `❌ Cloudinary credentials not configured`
   - `❌ Cloudinary upload error`
   - `Error in updateUserResume`

## 🐛 Debugging Steps

### 1. Check if Cloudinary is Configured

Visit: `https://hire-hive-backend-final.vercel.app/api/health`

If `cloudinary: "missing"`:
- Environment variables are not set
- Variables are set but not redeployed
- Variable names are incorrect

### 2. Check Vercel Logs

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Logs** tab
4. Try uploading a resume
5. Look for error messages in logs

### 3. Test with Smaller File

- Try uploading a smaller PDF (< 1MB)
- If small file works, issue is timeout
- If small file fails, issue is configuration

## 🚀 Alternative Solution: Direct Cloudinary Upload

If Vercel timeout is an issue, you can upload directly from frontend to Cloudinary:

1. Install Cloudinary SDK in frontend
2. Upload file directly from browser to Cloudinary
3. Send Cloudinary URL to backend
4. Backend saves URL to database

This bypasses backend timeout issues.

## 📋 Checklist

- [ ] Cloudinary environment variables set in Vercel
- [ ] All environment variables set correctly
- [ ] Project redeployed after adding variables
- [ ] Health endpoint shows `cloudinary: "configured"`
- [ ] Vercel logs show no errors
- [ ] Tested with small file (< 1MB)
- [ ] Tested with larger file (< 5MB)

## 🔍 Common Errors

### Error: "File upload service is not configured"
**Solution:** Set Cloudinary environment variables in Vercel and redeploy.

### Error: "Function execution timed out"
**Solution:** 
- Upgrade to Vercel Pro (60 second timeout)
- Or compress file before upload
- Or use direct Cloudinary upload from frontend

### Error: "Cloudinary authentication failed"
**Solution:** Check Cloudinary credentials are correct in Vercel environment variables.

## 📞 Next Steps

1. **Set environment variables in Vercel**
2. **Redeploy backend**
3. **Test health endpoint**
4. **Try uploading resume**
5. **Check Vercel logs for errors**

If still not working, check Vercel logs and share the error message.

