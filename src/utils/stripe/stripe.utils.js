import { loadStripe } from "@stripe/stripe-js"; // loadStripe runs OUR stripe instance.

export const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    );