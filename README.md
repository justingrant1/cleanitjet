# CleanItJet - Private Aviation Detailing Platform

A fully functional booking platform for on-demand private aviation detailing services with integrated Stripe payments.

## Features

- ✈️ Interactive booking interface with real-time pricing
- 💳 Full Stripe Checkout integration (live mode)
- 📊 Dynamic pricing based on aircraft size and service level
- ✅ Professional confirmation page with next steps
- 🔒 Secure payment processing via Stripe
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: HTML, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Payment Processing**: Stripe
- **Design**: Inter font, Iconify icons

## Stripe Products Created

### Services
1. **The Turnaround** - Essential ramp presence service
2. **The Layover** - Deep interior cleaning
3. **Red Carpet** - Premium full-service detail
4. **Exterior Detail** - Complete exterior cleaning add-on

### Pricing Structure
- **Light Jet**: $950 - $4,500 (+ $900 exterior)
- **Midsize**: $1,500 - $8,000 (+ $2,500 exterior)
- **Heavy Jet**: $2,700 - $15,000 (+ $7,000 exterior)

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. The `.env` file is already configured with your Stripe live key

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at: **http://localhost:3000**

## Project Structure

```
cleanitjet/
├── index.html          # Main landing page with booking form
├── success.html        # Confirmation page after payment
├── server.js           # Express backend with Stripe integration
├── package.json        # Node.js dependencies
├── .env               # Environment variables (Stripe key)
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Usage

1. Open http://localhost:3000 in your browser
2. Select aircraft size (Light Jet, Midsize, or Heavy Jet)
3. Choose service level (Turnaround, Layover, or Red Carpet)
4. Optionally add Exterior Detail
5. Enter aircraft tail number and airport code
6. Click "Book Service" to proceed to Stripe Checkout
7. Complete payment
8. View confirmation page with next steps

## Stripe Integration

The application uses Stripe Checkout for payment processing:
- All products and prices are created in your Stripe account
- Payments are processed in **LIVE MODE**
- Checkout sessions include metadata (tail number, airport code, service details)
- Success page displays booking confirmation and next steps

## Important Notes

⚠️ **Security Reminder**: The Stripe secret key in `.env` should be rotated for security best practices after initial setup.

## Support

For questions or issues, contact support at support@cleanitjet.com

---

© 2024 CleanItJet Inc. All rights reserved.
