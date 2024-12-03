import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env["STRIPE_SECRET_KEY"] as string);
export async function POST(req: NextRequest) {
  try {
    const { amount, metadata } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "always",
      },
      metadata,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error("Error creating payment intent:", err);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { paymentIntentId } = await req.json();

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "requires_capture") {
      const capturedPayment =
        await stripe.paymentIntents.capture(paymentIntentId);
      return NextResponse.json({ success: true, payment: capturedPayment });
    }

    if (paymentIntent.status === "succeeded") {
      return NextResponse.json({ success: true, payment: paymentIntent });
    }

    return NextResponse.json(
      { error: `Payment is in ${paymentIntent.status} state` },
      { status: 400 },
    );
  } catch (err) {
    console.error("Error handling payment:", err);
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 },
    );
  }
}
