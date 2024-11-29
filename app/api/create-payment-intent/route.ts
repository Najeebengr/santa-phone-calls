// app/api/create-payment-intent/route.ts
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] as string, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { amount, metadata } = await req.json();
    
    // Create a payment intent that works with all payment methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always'
      },
      metadata,
      // Remove capture_method to allow automatic capture for methods that require it
      payment_method_options: {
        card: {
          capture_method: 'manual', // Only apply manual capture to card payments
        },
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (err) {
    console.error('Error creating payment intent:', err);
    return NextResponse.json(
      { error: 'Payment initialization failed' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { paymentIntentId } = await req.json();
    
    // First check if the payment needs to be captured
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'requires_capture') {
      // Only capture if the payment is in requires_capture state
      const capturedPayment = await stripe.paymentIntents.capture(paymentIntentId);
      return NextResponse.json({ success: true, payment: capturedPayment });
    } else if (paymentIntent.status === 'succeeded') {
      // Payment was already captured (e.g., Apple Pay)
      return NextResponse.json({ success: true, payment: paymentIntent });
    } else {
      return NextResponse.json(
        { error: `Payment is in ${paymentIntent.status} state` },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error('Error handling payment:', err);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}