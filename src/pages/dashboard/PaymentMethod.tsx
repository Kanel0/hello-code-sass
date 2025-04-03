"use client";

import { useState } from "react";

import Dashboard from "./dashboard";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PaymentMethod() {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    if (selectedMethod === "stripe") {
      const stripe = await stripePromise;
      if (!stripe) return;

      const response = await fetch("/api/checkout", { method: "POST" });
      const { sessionId } = await response.json();
      await stripe.redirectToCheckout({ sessionId });
    } else {
      alert("Autres méthodes bientôt disponibles !");
    }

    setLoading(false);
  };

  return (
    <Dashboard currentPath={location.pathname}>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Choisir un mode de paiement</h2>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="stripe"
              name="payment"
              value="stripe"
              checked={selectedMethod === "stripe"}
              onChange={() => setSelectedMethod("stripe")}
              className="w-4 h-4"
            />
            <label htmlFor="stripe" className="text-gray-700">💳 Carte bancaire (via Stripe)</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="paypal"
              name="payment"
              value="paypal"
              checked={selectedMethod === "paypal"}
              onChange={() => setSelectedMethod("paypal")}
              className="w-4 h-4"
            />
            <label htmlFor="paypal" className="text-gray-700">💰 PayPal (Bientôt)</label>
          </div>

          <button
            onClick={handlePayment}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Traitement..." : "Payer maintenant"}
          </button>
        </div>
      </div>
    </Dashboard>
  );
}
