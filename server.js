require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve static files from root directory
app.use(express.static('.'));

// Price mapping - maps aircraft size and service tier to Stripe price IDs
const PRICE_MAP = {
  'small': {
    'turnaround': 'price_1Skt66GXbz681rpwyGOk728Q',
    'layover': 'price_1Skt6bGXbz681rpw4h1exQWJ',
    'redcarpet': 'price_1Skt73GXbz681rpwuQsNSedy',
    'exterior': 'price_1Skt7QGXbz681rpwmFSHl6XJ'
  },
  'mid': {
    'turnaround': 'price_1Skt6HGXbz681rpwCthQ7b2t',
    'layover': 'price_1Skt6jGXbz681rpwzakFmnla',
    'redcarpet': 'price_1Skt7AGXbz681rpwO18aV9pi',
    'exterior': 'price_1Skt7YGXbz681rpwEdb8vKmQ'
  },
  'large': {
    'turnaround': 'price_1Skt6SGXbz681rpwTh18tEZD',
    'layover': 'price_1Skt6vGXbz681rpwWFuhOqFD',
    'redcarpet': 'price_1Skt7HGXbz681rpwzLo2C9ul',
    'exterior': 'price_1Skt7iGXbz681rpwSrF5IEGh'
  }
};

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { aircraftSize, serviceTier, includeExterior, tailNumber, airportCode } = req.body;

    // Validate input
    if (!aircraftSize || !serviceTier || !tailNumber || !airportCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Build line items
    const lineItems = [];

    // Add main service
    const servicePriceId = PRICE_MAP[aircraftSize][serviceTier];
    if (!servicePriceId) {
      return res.status(400).json({ error: 'Invalid aircraft size or service tier' });
    }

    lineItems.push({
      price: servicePriceId,
      quantity: 1,
    });

    // Add exterior detail if selected
    if (includeExterior) {
      const exteriorPriceId = PRICE_MAP[aircraftSize]['exterior'];
      lineItems.push({
        price: exteriorPriceId,
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/index.html`,
      metadata: {
        tailNumber,
        airportCode,
        aircraftSize,
        serviceTier,
        includeExterior: includeExterior ? 'yes' : 'no'
      },
      customer_email: req.body.email || undefined,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get session details (for success page)
app.get('/session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 CleanItJet server running on http://localhost:${PORT}`);
  console.log(`📧 Stripe connected in ${process.env.STRIPE_SECRET_KEY.includes('_test_') ? 'TEST' : 'LIVE'} mode`);
});
