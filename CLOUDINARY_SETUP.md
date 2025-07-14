# Cloudinary Setup Instructions

## Step 1: Get Your Cloudinary Credentials

1. Go to [cloudinary.com](https://cloudinary.com) and sign up for a free account
2. After signing up, go to your Dashboard
3. You'll see your credentials:
   - **Cloud Name**: (something like "dxxxxx")
   - **API Key**: (a long number)
   - **API Secret**: (a string of letters and numbers)

## Step 2: Update Your .env.local File

You can configure Cloudinary in two ways:

### Method 1: Using Cloudinary URL (Recommended)

Replace the placeholder with your actual Cloudinary URL:

```bash
# Replace with your actual Cloudinary URL
CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@<your_cloud_name>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your_cloud_name>
```

### Method 2: Using Individual Credentials

Replace the placeholder values with your actual Cloudinary credentials:

```bash
# Replace these with your actual Cloudinary credentials
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
```

## Step 3: Restart Your Development Server

After updating the environment variables:

1. Stop your development server (Ctrl+C)
2. Run `npm run dev` again
3. The new credentials will be loaded

## Example of What Your Credentials Look Like:

### Using Cloudinary URL Format:

```bash
# Example (don't use these exact values)
CLOUDINARY_URL=cloudinary://123456789012345:AbCdEfGhIjKlMnOpQrStUvWxYz@dh2k3x9yz
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dh2k3x9yz
```

### Using Individual Credentials:

```bash
# Example (don't use these exact values)
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dh2k3x9yz
```

## Cloudinary Free Tier Limits:

- ✅ **25 GB storage** (very generous)
- ✅ **25 GB bandwidth per month**
- ✅ **1,000 transformations per month**
- ✅ **50 MB maximum file size** (configurable)
- ✅ Perfect for educational PDF storage

## File Size Limits:

- **Default Cloudinary limit**: 10 MB
- **Our configuration**: 50 MB (for large educational PDFs)
- **Recommended**: Keep PDFs under 20 MB for better user experience
- **Large files**: Will be uploaded in chunks automatically

## Need Help Getting Credentials?

1. Login to Cloudinary Dashboard
2. The credentials are displayed right on the main dashboard page
3. Click the "eye" icon to reveal the API Secret
4. Copy each value exactly as shown
