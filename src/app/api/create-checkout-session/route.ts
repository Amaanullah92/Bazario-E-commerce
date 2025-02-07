import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// POST handler
export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse JSON body
        const { cart } = body; // Assume the request body includes an array of cart items

        // Map cart items to Stripe line items
        const lineItems = cart.map((item: { name: string; price: number; quantity: number; image: string }) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name, // Product name
                    images: [item.image], // Add product image URL here
                },
                unit_amount: item.price * 100, // Convert price to cents
            },
            quantity: item.quantity, // Product quantity
        }));

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems, // Use the mapped line items here
            mode: "payment",
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/cancel`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
    
}

// Method Not Allowed for other HTTP methods
export async function GET() {
    return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
    );
}
