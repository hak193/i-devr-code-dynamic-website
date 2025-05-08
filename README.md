# I-DevR Code Dynamic Website

## Overview

This project is a dynamic website for I-DevR Code, built with a Laravel backend and React frontend. It includes features such as a custom app builder, custom coding solutions, computer repairs, and Stripe payment integration.

---

## Backend Setup (Laravel)

### 1. Stripe Configuration

Add the following to `backend/config/services.php`:

```php
'stripe' => [
    'secret' => env('STRIPE_SECRET'),
    'public' => env('STRIPE_PUBLIC'),
],
```

Add Stripe keys to your `.env` file:

```
STRIPE_SECRET=your_stripe_secret_key
STRIPE_PUBLIC=your_stripe_public_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 2. Controllers

Create `PageController.php` in `backend/app/Http/Controllers/`:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PageController extends Controller
{
    public function homepage()
    {
        try {
            return view('welcome');
        } catch (\Exception $e) {
            Log::error('Error loading homepage: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to load homepage'], 500);
        }
    }

    public function about()
    {
        try {
            return view('about');
        } catch (\Exception $e) {
            Log::error('Error loading about page: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to load about page'], 500);
        }
    }

    public function services()
    {
        try {
            return view('services');
        } catch (\Exception $e) {
            Log::error('Error loading services page: ' . $e->getMessage());
            return response()->json(['error' => 'Unable to load services page'], 500);
        }
    }
}
```

Create `PaymentController.php` in `backend/app/Http/Controllers/`:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        $this->validate($request, [
            'amount' => 'required|integer|min:50',
            'currency' => 'required|string|size:3',
        ]);

        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $paymentIntent = PaymentIntent::create([
                'amount' => $request->input('amount'),
                'currency' => $request->input('currency'),
                'payment_method_types' => ['card'],
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
            ]);
        } catch (\Exception $e) {
            Log::error('Stripe PaymentIntent creation failed: ' . $e->getMessage());
            return response()->json(['error' => 'Payment initialization failed'], 500);
        }
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sigHeader, $endpointSecret
            );

            switch ($event->type) {
                case 'payment_intent.succeeded':
                    $paymentIntent = $event->data->object;
                    Log::info('PaymentIntent succeeded: ' . $paymentIntent->id);
                    // TODO: Update order status or trigger fulfillment
                    break;
                default:
                    Log::info('Received unhandled event type ' . $event->type);
            }

            return response()->json(['status' => 'success']);
        } catch(\UnexpectedValueException $e) {
            Log::error('Invalid payload: ' . $e->getMessage());
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch(\Stripe\Exception\SignatureVerificationException $e) {
            Log::error('Invalid signature: ' . $e->getMessage());
            return response()->json(['error' => 'Invalid signature'], 400);
        }
    }
}
```

### 3. Routes

Update `backend/routes/web.php` to include:

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PaymentController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', [PageController::class, 'about']);
Route::get('/services', [PageController::class, 'services']);

Route::post('/payment/create-intent', [PaymentController::class, 'createPaymentIntent']);
Route::post('/payment/webhook', [PaymentController::class, 'webhook']);
```

---

## Frontend Setup (React)

### 1. Dependencies

Add the following dependencies to `frontend/package.json`:

```json
"react-router-dom": "^6.14.1",
"@stripe/stripe-js": "^1.60.0",
"@stripe/react-stripe-js": "^1.11.0"
```

Run:

```bash
npm install
```

### 2. Pages and Components

- `src/pages/Homepage.jsx` - Homepage with hero, services overview, and CTAs.
- `src/pages/About.jsx` - About Us page with mission and local SEO content.
- `src/pages/Services.jsx` - Services page with details and CTAs.
- `src/pages/AppBuilder.jsx` - Multi-step app builder workflow placeholder.
- `src/components/Navbar.jsx` - Navigation bar with links and CTA.
- `src/components/Footer.jsx` - Simple footer.

### 3. Routing

Update `src/App.js` to include routing:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Services from './pages/Services';
import AppBuilder from './pages/AppBuilder';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/app-builder" element={<AppBuilder />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
```

---

## Manual Steps Due to Write Errors

Some files could not be updated automatically due to write permission errors. Please manually update the following files with the above code snippets:

- `backend/config/services.php` (add Stripe config)
- `backend/routes/web.php` (add routes)
- `frontend/package.json` (add dependencies)
- `frontend/src/App.js` (add routing)

---

## Running the Project

### Backend

1. Set your `.env` variables including Stripe keys.
2. Run Laravel server:

```bash
php artisan serve
```

### Frontend

1. Install dependencies:

```bash
npm install
```

2. Run React app:

```bash
npm start
```

---

## Notes

- Ensure your Stripe webhook secret is set in `.env` as `STRIPE_WEBHOOK_SECRET`.
- The app builder workflow and payment integration are placeholders and should be extended.
- Use Tailwind CSS or your preferred styling for UI enhancements.
- Add tests and error handling as needed.

---

This README provides a complete guide to set up and extend the I-DevR Code dynamic website project.
