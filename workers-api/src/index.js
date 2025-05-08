import { Router } from 'itty-router';
import Stripe from 'stripe';

// Create a new router
const router = Router();

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS requests for CORS
router.options('*', () => new Response(null, { headers: corsHeaders }));

// Homepage data
router.get('/api/homepage', () => {
  const data = {
    hero: {
      title: 'Welcome to I-DevR Code',
      description: 'Build your custom app, get expert coding solutions, or repair your computer with us.',
    },
    services: [
      {
        title: 'App Builder',
        description: 'Build your custom app with our easy-to-use builder.',
      },
      {
        title: 'Custom Coding',
        description: 'Expert coding solutions tailored to your project needs.',
      },
      {
        title: 'Computer Repairs',
        description: 'Reliable and fast computer repair services.',
      },
    ],
  };
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
});

// About page data
router.get('/api/about', () => {
  const data = {
    mission: 'Our mission is to empower businesses and individuals with custom software solutions.',
    location: 'Worcester, MA',
    values: [
      'Quality',
      'Innovation',
      'Customer Satisfaction',
    ],
  };

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
});

// Services data
router.get('/api/services', () => {
  const data = {
    appBuilder: {
      title: 'Custom App Builder',
      description: 'Build your app with our easy process',
      steps: ['Build', 'Preview', 'Pay', 'Download/Access'],
      pricing: ['Basic', 'Pro', 'Enterprise'],
    },
    customCoding: {
      title: 'Custom Coding Solutions',
      description: 'Professional development services',
    },
    repairs: {
      title: 'Computer Repairs',
      description: 'Fast and reliable repair services',
    },
  };

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
});

// Create Payment Intent
router.post('/api/payment/create-intent', async (request) => {
  try {
    const { amount, currency } = await request.json();
    
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});

// Handle Stripe webhook
router.post('/api/payment/webhook', async (request) => {
  try {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    const signature = request.headers.get('stripe-signature');
    const event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        break;
      // Add other event handlers as needed
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});

// 404 for everything else
router.all('*', () => new Response('Not Found', { status: 404 }));

// Attach the router to the fetch event
addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request));
});
