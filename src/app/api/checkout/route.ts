import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
// It's safe to initialize even if the key is empty by providing a dummy string during build time
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy_for_build", {
  apiVersion: "2026-02-25.clover", // Use the installed package's expected version
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    // Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing or invalid items array." }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
       console.error("STRIPE_SECRET_KEY is not set in environment variables.");
       return NextResponse.json({ error: "Stripe configuration error on the server." }, { status: 500 });
    }

    // Map frontend items to Stripe line items
    const lineItems = items.map((item: { name: string; price: number; quantity: number; image?: string }) => ({
      price_data: {
        currency: "gbp", // Using GBP based on the £ symbol in the products page
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        // Stripe expects price in cents/pence (e.g., £18.00 = 1800)
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    // Create Checkout Session
    const origin = req.headers.get("origin") || "http://localhost:3000";
    
    // Using explicit mode
    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
    };

    const session = await stripe.checkout.sessions.create(params);

    if (!session.url) {
      throw new Error("Stripe did not return a session URL.");
    }

    // Return the session URL to the frontend so it can redirect the user
    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: err.message || "An error occurred during checkout." },
      { status: 500 }
    );
  }
}
