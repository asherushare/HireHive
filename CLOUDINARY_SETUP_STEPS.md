# 🔧 Fix: "Server error. Please check if file upload service is configured"

## The Problem
Cloudinary environment variables are **NOT set** in your Vercel backend deployment.

## The Solution
Add Cloudinary credentials to Vercel and redeploy.

---

## Step-by-Step Fix

### 1. Get Cloudinary Account (If you don't have one)

1. Go to: https://cloudinary.com/users/register/free
2. Sign up for a **free account**
3. After registration, you'll be taken to the Dashboard
4. You'll see your credentials displayed

### 2. Copy Your Cloudinary Credentials

From the Cloudinary Dashboard, copy these three values:

1. **Cloud Name** - Looks like: `dxyz123abc`
2. **API Key** - Looks like: `123456789012345`
3. **API Secret** - Looks like: `abcdefghijklmnopqrstuvwxyz123456`

**Where to find them:**
- Dashboard → You'll see them displayed prominently
- Or: Dashboard → Settings → Account Details

### 3. Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Click on your backend project: **`hire-hive-backend-final`**
3. Click **Settings** (in the top menu)
4. Click **Environment Variables** (in the left sidebar)
5. Click **Add New** button

6. Add the first variable:
   - **Key:** `CLOUDINARY_NAME`
   - **Value:** Paste your Cloudinary Cloud Name
   - **Environment:** Select all three:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
   - Click **Save**

7. Add the second variable:
   - **Key:** `CLOUDINARY_API_KEY`
   - **Value:** Paste your Cloudinary API Key
   - **Environment:** Select all three (Production, Preview, Development)
   - Click **Save**

8. Add the third variable:
   - **Key:** `CLOUDINARY_SECRET_KEY`
   - **Value:** Paste your Cloudinary API Secret
   - **Environment:** Select all three (Production, Preview, Development)
   - Click **Save**

### 4. Redeploy Backend ⚠️ CRITICAL STEP

**⚠️ IMPORTANT:** Environment variables ONLY work after redeploying!

1. Click **Deployments** tab (in the top menu)
2. Find the **latest deployment** (top of the list)
3. Click the **three dots** (⋯) on the right side
4. Click **Redeploy**
5. Click **Redeploy** again to confirm
6. Wait 2-3 minutes for deployment to complete
7. You'll see a green checkmark ✅ when done

### 5. Test

1. **Test Company Registration:**
   - Try registering as a recruiter
   - Upload a company logo
   - Should work! ✅

2. **Test Resume Upload:**
   - Login as a user
   - Upload a resume
   - Should work! ✅

---

## Verify It's Working

### Check Vercel Logs:

1. Go to Vercel Dashboard → Your Backend Project
2. Click **Logs** tab
3. Look for this message:
   ```
   ✅ Cloudinary configured successfully
   ```
4. If you see this, it's working! ✅

### Check Browser Console:

1. Open browser console (F12)
2. Try registering/uploading
3. Should see:
   ```
   ✅ Cloudinary upload successful
   ```
4. No more 500 errors! ✅

---

## Common Mistakes

### ❌ Mistake 1: Forgot to Redeploy
**Symptom:** Added variables but still getting error
**Fix:** You MUST redeploy after adding variables!

### ❌ Mistake 2: Wrong Variable Names
**Symptom:** Variables added but not working
**Fix:** Variable names must be exact:
- ✅ `CLOUDINARY_NAME` (correct)
- ❌ `cloudinary_name` (wrong - lowercase)
- ❌ `CLOUDINARY-NAME` (wrong - hyphen)

### ❌ Mistake 3: Wrong Environment Selected
**Symptom:** Variables added but not working in production
**Fix:** Make sure "Production" is selected, or select all environments

### ❌ Mistake 4: Extra Spaces
**Symptom:** Credentials look correct but don't work
**Fix:** Make sure there are no extra spaces before/after the values

---

## Quick Checklist

- [ ] Created Cloudinary account
- [ ] Got Cloudinary credentials
- [ ] Added `CLOUDINARY_NAME` to Vercel
- [ ] Added `CLOUDINARY_API_KEY` to Vercel
- [ ] Added `CLOUDINARY_SECRET_KEY` to Vercel
- [ ] Selected all environments
- [ ] **Redeployed backend** ⚠️
- [ ] Checked Vercel logs for success message
- [ ] Tested company registration
- [ ] Tested resume upload

---

## Still Not Working?

### Check Vercel Logs:
1. Go to Vercel Dashboard → Your Backend Project → **Logs**
2. Look for error messages
3. Should see: `✅ Cloudinary configured successfully`
4. If you see: `⚠️ WARNING: Cloudinary credentials are not set`, variables are not set correctly

### Double-Check:
1. Are all three variables added?
2. Are variable names exact (case-sensitive)?
3. Are values correct (no extra spaces)?
4. Did you redeploy after adding variables?
5. Are variables set for Production environment?

---

## Need Help?

Share these details:
1. Screenshot of Vercel Environment Variables (hide sensitive values)
2. Vercel Logs (showing Cloudinary status)
3. Browser Console errors (if any)

---

## Summary

**The fix is 3 steps:**
1. Get Cloudinary credentials
2. Add them to Vercel
3. **Redeploy** ⚠️

**Most common issue:** Forgetting to redeploy after adding variables!

---

**After completing these steps, the error will be fixed! 🎉**

