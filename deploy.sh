#!/bin/bash

echo "🚀 Starting deployment process..."

# Deploy Workers API
echo ""
echo "📡 Deploying Workers API..."
cd workers-api
chmod +x deploy.sh
./deploy.sh

if [ $? -ne 0 ]; then
    echo "❌ Workers API deployment failed"
    exit 1
fi

# Deploy Frontend
echo ""
echo "🌐 Deploying Frontend..."
cd ../frontend
chmod +x build.sh
./build.sh

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "Next steps:"
echo "1. Visit your Cloudflare Dashboard to verify the deployments"
echo "2. Configure your custom domain if needed"
echo "3. Test the application at your Cloudflare Pages URL"
echo ""
echo "Frontend URL: https://i-devr-code.pages.dev"
echo "API URL: https://api.i-devr-code.workers.dev"
