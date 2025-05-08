#!/bin/bash

# Install dependencies
npm install

# Build the React app
npm run build

# Ensure _headers and _redirects are in the build directory
cp public/_headers build/_headers
cp public/_redirects build/_redirects

# Create a routes.json file in the build directory for Cloudflare Pages
cat > build/routes.json << EOL
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/api/*"]
}
EOL

echo "Build completed successfully!"
