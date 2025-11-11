# 🚨 QUICK FIX: Cloudinary Configuration Error

## Error Message
"Server error. Please check if file upload service is configured."

## What This Means
**Cloudinary environment variables are NOT set in Vercel**, so file uploads (resume and company logo) are failing.

## ✅ Fix in 5 Minutes

### Step 1: Get Cloudinary Credentials (2 minutes)

1. Go to https://cloudinary.com/users/register/free
2. Sign up for a **free account** (no credit card required)
3. After signing up, you'll see your **Dashboard**
4. Copy these three values:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### Step 2: Add to Vercel (2 minutes)

1. Go to https://vercel.com/dashboard
2. Click on your **backend project** (`hire-hive-backend-final`)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New** button
5. Add these three variables one by one:

   **Variable 1:**
   - **Key:** `CLOUDINARY_NAME`
   - **Value:** Your Cloudinary Cloud Name
   - **Environment:** ✅ Production ✅ Preview ✅ Development (check all)
   - Click **Save**

   **Variable 2:**
   - **Key:** `CLOUDINARY_API_KEY`
   - **Value:** Your Cloudinary API Key
   - **Environment:** ✅ Production ✅ Preview ✅ Development (check all)
   - Click **Save**

   **Variable 3:**
   - **Key:** `CLOUDINARY_SECRET_KEY`
   - **Value:** Your Cloudinary API Secret
   - **Environment:** ✅ Production ✅ Preview ✅ Development (check all)
   - Click **Save**

### Step 3: Redeploy Backend (1 minute) ⚠️ CRITICAL

**⚠️ IMPORTANT:** Environment variables only take effect after redeploying!

1. Go to **Deployments** tab
2. Find the **latest deployment**
3. Click the **three dots** (⋯) menu
4. Click **Redeploy**
5. Wait for deployment to complete (2-3 minutes)
6. You'll see a green checkmark when done

### Step 4: Test (30 seconds)

1. **Test Company Registration:**
   - Try registering as a recruiter again
   - Upload a company logo
   - Should work without errors!

2. **Test Resume Upload:**
   - Login as a user
   - Upload a resume
   - Should work without errors!

## 🔍 Verify It's Fixed

### Check Vercel Logs:
1. Go to Vercel Dashboard → Your Backend Project
2. Click **Logs** tab
3. Look for: `✅ Cloudinary configured successfully`
4. If you see this, it's working!

### Check Browser Console:
1. Open browser console (F12)
2. Try registering/uploading
3. Should see: `✅ Cloudinary upload successful`
4. No more 500 errors!

## ❌ Still Not Working?

### Check These:

1. **Did you redeploy?** ⚠️ Most common mistake!
   - Variables only work after redeploy
   - Check Deployments tab for latest deployment

2. **Are variable names correct?**
   - Must be exact: `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`
   - Case-sensitive, no spaces

3. **Are credentials correct?**
   - Double-check you copied the right values
   - No extra spaces before/after

4. **Are variables set for Production?**
   - Make sure you selected "Production" environment
   - Or select all environments (Production, Preview, Development)

5. **Check Vercel Logs:**
   - Go to Logs tab
   - Look for error messages
   - Should see Cloudinary configuration status

## 📸 Screenshot Guide

### What Vercel Environment Variables Should Look Like:

```
CLOUDINARY_NAME          dxyz123abc          [Production, Preview, Development]
CLOUDINARY_API_KEY       123456789012345     [Production, Preview, Development]
CLOUDINARY_SECRET_KEY    abcdefghijklmn...   [Production, Preview, Development]
```

### After Adding Variables:
- ✅ All three variables are listed
- ✅ All environments are selected
- ✅ Values are correct (no spaces)

### After Redeploying:
- ✅ Latest deployment shows "Ready" status
- ✅ Deployment time is recent (just now)
- ✅ No errors in deployment logs

## 🎯 Quick Checklist

- [ ] Created Cloudinary account
- [ ] Got Cloudinary credentials (Name, API Key, Secret)
- [ ] Added `CLOUDINARY_NAME` to Vercel
- [ ] Added `CLOUDINARY_API_KEY` to Vercel
- [ ] Added `CLOUDINARY_SECRET_KEY` to Vercel
- [ ] Selected all environments (Production, Preview, Development)
- [ ] **Redeployed backend** ⚠️ CRITICAL STEP
- [ ] Checked Vercel logs for "Cloudinary configured successfully"
- [ ] Tested company registration
- [ ] Tested resume upload

## 💡 Pro Tips

1. **Free Cloudinary Account:**
   - 25 GB storage
   - 25 GB bandwidth/month
   - Perfect for development and small projects

2. **File Size Limits:**
   - Maximum: 5MB (enforced in code)
   - Recommended: < 1MB for faster uploads

3. **Security:**
   - Never commit Cloudinary credentials to Git
   - Always use environment variables
   - Keep API Secret secure

## 🚀 After Fixing

Once Cloudinary is configured:
- ✅ Company registration will work
- ✅ Resume upload will work
- ✅ File uploads will be stored in Cloudinary
- ✅ Files will be accessible via URLs
- ✅ No more 500 errors!

---

## 📞 Need Help?

If you're still getting errors after following these steps:

1. **Check Vercel Logs:**
   - Go to Logs tab
   - Look for specific error messages
   - Share the error with me

2. **Verify Credentials:**
   - Test credentials in Cloudinary dashboard
   - Make sure account is active
   - Check if there are any account limits

3. **Common Issues:**
   - Forgot to redeploy (most common!)
   - Wrong variable names
   - Wrong credentials
   - Variables not set for Production environment

---

**The fix is simple: Add Cloudinary credentials to Vercel and redeploy! 🎉**

