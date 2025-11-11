# 🚀 Deployment Checklist - Step by Step

## ✅ Step 1: Commit & Push Code Changes

**Will auto-deploy to Vercel?** 
- ✅ **YES** - If Vercel is connected to your GitHub repo
- ✅ **YES** - If you push to the branch that Vercel watches (usually `main` or `master`)
- ⚠️ **Backend (Render)** - Check if Render is connected to GitHub, or you may need to manually redeploy

**Commands:**
```bash
git add .
git commit -m "Fix deployment issues: memory storage, error handling, webhook fixes"
git push origin main  # or master, depending on your branch
```

**What happens:**
1. ✅ Frontend (Vercel) - Automatically detects push and deploys (takes 2-3 minutes)
2. ✅ Backend (Render) - If connected to GitHub, auto-deploys. Otherwise, manually trigger redeploy.

---

## ⚠️ Step 2: Configure Environment Variables (CRITICAL - MUST DO MANUALLY)

**⚠️ IMPORTANT:** Code changes alone won't fix everything. You MUST configure environment variables in the hosting dashboards.

### **Frontend (Vercel Dashboard)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx  # PRODUCTION KEY (NOT dev key)
VITE_BACKEND_URL=https://your-backend.onrender.com
```

5. ✅ **Redeploy** after adding variables (Vercel will ask, or go to Deployments → Redeploy)

### **Backend (Render Dashboard)**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Go to **Environment** tab
4. Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/HireHive
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx  # PRODUCTION KEY (NOT dev key)
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_SECRET_KEY=your-secret-key
JWT_SECRET=any-random-secret-string
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
```

5. ✅ **Save** and **Redeploy** (Render will auto-redeploy when you save)

---

## 🔧 Step 3: Configure Clerk Webhook (CRITICAL)

**This is the MOST COMMON issue causing "User not found" errors.**

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Make sure you're in **Production** environment (not Development)
3. Go to **Webhooks** → **Add Endpoint**
4. Enter webhook URL: `https://your-backend.onrender.com/webhooks`
5. Select events:
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`
6. Copy the **Signing Secret** (starts with `whsec_`)
7. Add it to Render as `CLERK_WEBHOOK_SECRET`
8. ✅ **Save** and test the webhook

---

## 🔑 Step 4: Get Production Clerk Keys

**⚠️ CRITICAL:** You MUST use PRODUCTION keys, not development keys.

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. **Switch to Production environment** (top right corner)
3. Go to **API Keys**
4. Copy:
   - **Publishable Key** (starts with `pk_live_`) → Add to Vercel as `VITE_CLERK_PUBLISHABLE_KEY`
   - **Secret Key** (starts with `sk_live_`) → Add to Render as `CLERK_SECRET_KEY`

---

## ✅ Step 5: Verify Deployment

### Check Frontend (Vercel)
1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Check if latest deployment is ✅ **Ready**
3. Visit your site: `https://your-frontend.vercel.app`
4. Check browser console for errors

### Check Backend (Render)
1. Go to Render Dashboard → Your Service → **Logs**
2. Look for these messages:
   ```
   🚀 Starting server...
   ✅ MongoDB connected successfully
   ✅ Cloudinary configured successfully
   ✅ Clerk middleware configured
   ✅ All services connected
   Server running on port 5000
   ```
3. Test API: `https://your-backend.onrender.com/` (should return "API is running...")

### Test User Registration
1. Register a new user via Clerk
2. Check Render logs for: `Webhook received: user.created`
3. Check MongoDB to verify user was created
4. If user not created → Webhook is not configured correctly

---

## 🐛 Common Issues & Solutions

### Issue 1: "User not found" error
**Cause:** Webhook not configured or wrong webhook secret
**Solution:**
1. Check if webhook is configured in Clerk Dashboard
2. Verify `CLERK_WEBHOOK_SECRET` in Render matches Clerk's signing secret
3. Check Render logs for webhook errors
4. Test webhook in Clerk Dashboard

### Issue 2: "Please login" error
**Cause:** Using development keys or missing `CLERK_SECRET_KEY`
**Solution:**
1. Verify you're using PRODUCTION keys (`pk_live_` and `sk_live_`)
2. Check if `CLERK_SECRET_KEY` is set in Render
3. Verify `VITE_CLERK_PUBLISHABLE_KEY` is set in Vercel
4. Redeploy both frontend and backend after adding keys

### Issue 3: File upload fails (500 error)
**Cause:** Missing Cloudinary credentials
**Solution:**
1. Verify all `CLOUDINARY_*` variables are set in Render
2. Check Cloudinary credentials are correct
3. Verify file size is under 5MB
4. Check Render logs for specific errors

### Issue 4: CORS errors
**Cause:** Wrong `FRONTEND_URL` in Render
**Solution:**
1. Set `FRONTEND_URL` in Render to your Vercel URL
2. Format: `https://your-frontend.vercel.app` (no trailing slash)
3. Redeploy backend

---

## 📋 Quick Checklist

- [ ] Code committed and pushed to GitHub
- [ ] Frontend auto-deployed on Vercel (check Deployments)
- [ ] Backend auto-deployed on Render (check Logs)
- [ ] **Vercel environment variables set:**
  - [ ] `VITE_CLERK_PUBLISHABLE_KEY` (PRODUCTION key)
  - [ ] `VITE_BACKEND_URL`
- [ ] **Render environment variables set:**
  - [ ] `MONGODB_URI`
  - [ ] `CLERK_SECRET_KEY` (PRODUCTION key)
  - [ ] `CLERK_WEBHOOK_SECRET`
  - [ ] `CLOUDINARY_NAME`
  - [ ] `CLOUDINARY_API_KEY`
  - [ ] `CLOUDINARY_SECRET_KEY`
  - [ ] `JWT_SECRET`
  - [ ] `FRONTEND_URL`
- [ ] **Clerk webhook configured:**
  - [ ] Webhook endpoint added in Clerk Dashboard
  - [ ] Events selected: `user.created`, `user.updated`, `user.deleted`
  - [ ] Webhook secret copied to Render
- [ ] **Production keys being used:**
  - [ ] Frontend using `pk_live_...` (not `pk_test_...`)
  - [ ] Backend using `sk_live_...` (not `sk_test_...`)
- [ ] **Tested:**
  - [ ] User registration works
  - [ ] User can login
  - [ ] Resume upload works
  - [ ] Job application works
  - [ ] No errors in browser console
  - [ ] No errors in Render logs

---

## 🎯 Summary

**What happens automatically:**
- ✅ Code changes deploy automatically (if connected to GitHub)
- ✅ Vercel auto-deploys on push
- ✅ Render auto-deploys on push (if connected)

**What you MUST do manually:**
- ⚠️ **Set environment variables in Vercel dashboard**
- ⚠️ **Set environment variables in Render dashboard**
- ⚠️ **Configure Clerk webhook in Clerk dashboard**
- ⚠️ **Use PRODUCTION keys (not development keys)**
- ⚠️ **Redeploy after adding environment variables**

**Bottom line:**
- Code fixes ✅ = Auto-deploy
- Environment variables ⚠️ = Manual configuration required
- Webhook setup ⚠️ = Manual configuration required

---

**After completing all steps, your app should work perfectly! 🎉**

