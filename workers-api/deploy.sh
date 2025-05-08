#!/bin/bash

# Install dependencies
npm install

# Build and deploy to Cloudflare Workers
echo "Deploying to Cloudflare Workers..."
npm run deploy

# Verify deployment
if [ $? -eq 0 ]; then
    echo "✅ API deployment successful!"
    echo "Your API is now available at: https://api.i-devr-code.workers.dev"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi

# Display next steps
echo ""
echo "Next steps:"
echo "1. Configure your environment variables in the Cloudflare Dashboard:"
echo "   - STRIPE_SECRET_KEY"
echo "   - STRIPE_WEBHOOK_SECRET"
echo ""
echo "2. Update the frontend .env.production with your Worker URL"
echo ""
echo "3. Deploy the frontend to Cloudflare Pages"
