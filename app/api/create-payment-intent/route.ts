import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia', // Use the correct API version for your Stripe setup
});


export async function POST(req: NextRequest) {
 try{
  const  price  = await req.json();
  const amount = price.amount
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",// Exclude Link by explicitly using 'card'
    automatic_payment_methods: {
      enabled: true, // Disable automatic selection of methods (including Link)
    },
  });
  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  
 }
 catch(err){
  console.log(err)
  return NextResponse.json({ error: `Internal server error ${err}` }, { status: 500 });
 }
}