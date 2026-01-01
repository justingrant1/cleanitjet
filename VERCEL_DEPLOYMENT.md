# Vercel Deployment Guide

Your code is now ready for Vercel deployment! Follow these steps to get your site live.

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit https://vercel.com and sign in (or create account)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository: `justingrant1/cleanitjet`

3. **Configure Project**:
   - **Framework Preset**: Select "Other" (we have custom config)
   - **Root Directory**: Leave as `./` (root)
   - **Build Command**: Leave empty (not needed)
   - **Output Directory**: Leave empty

4. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add: `STRIPE_SECRET_KEY` = `[Your Stripe Secret Key from .env file]`
   - Copy the key from your `.env` file
   - (Remember to rotate your key for security after sharing in chat!)

5. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for deployment
   - Your site will be live at `https://cleanitjet.vercel.app` (or similar)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
vercel

# Follow prompts, then deploy to production
vercel --prod
```

## ⚙️ What Was Fixed

✅ Added `vercel.json` configuration file
✅ Changed API URLs from `localhost:3000` to relative paths (`/api/endpoint`)
✅ Configured routing to handle both static files and API endpoints
✅ All code pushed to GitHub

## 🔒 Important: Set Environment Variables in Vercel

After importing your project:
1. Go to Project Settings → Environment Variables
2. Add your Stripe secret key
3. Redeploy if needed

## 📋 After Deployment

Once deployed, test your live site:
1. Visit your Vercel URL
2. Select an aircraft and service
3. Fill in tail number and airport code
4. Complete a test payment
5. Verify you're redirected to the success page

## 🔄 Future Updates

When you make changes:
```bash
git add .
git commit -m "your changes"
git push
```
Vercel will automatically redeploy!

## 🐛 Troubleshooting

**Issue**: "Cannot GET /"
- **Solution**: Vercel needs environment variables set. Add `STRIPE_SECRET_KEY` in dashboard.

**Issue**: "404 on /create-checkout-session"
- **Solution**: Make sure `vercel.json` is in your repository root.

**Issue**: Payments not working
- **Solution**: Check that your Stripe secret key is correctly set in Vercel environment variables.

## 📞 Need Help?

Check Vercel logs in your dashboard if something isn't working. The logs will show any errors.

---

Your site should now be live! 🎉
