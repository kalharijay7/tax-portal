"use client";

import { Client } from "@hubspot/api-client"; // Import HubSpot client
import { useRouter } from "next/navigation";

const hubspotClient = new Client({ apiKey: "your-hubspot-api-key" }); // Replace with your HubSpot API key

const BusinessPlans = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear session cookie
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  const handlePlanPurchase = async (planName: string, planPrice: string) => {
    try {
      // Record the purchase in HubSpot
      await hubspotClient.crm.deals.basicApi.create({
        properties: {
          dealname: planName,
          amount: planPrice.replace(/[^0-9]/g, ""), // Extract numeric value from price
          dealstage: "closedwon", // Example deal stage
          pipeline: "default", // Example pipeline
        },
      });

      alert(`You have successfully purchased the ${planName}!`);
    } catch (error) {
      console.error("Error recording purchase in HubSpot:", error);
      alert("An error occurred while processing your purchase. Please try again.");
    }
  };

  const plans = [
    { name: "Basic Plan", price: "$10/month", features: ["Feature 1", "Feature 2"] },
    { name: "Standard Plan", price: "$20/month", features: ["Feature 1", "Feature 2", "Feature 3"] },
    { name: "Premium Plan", price: "$30/month", features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"] },
    { name: "Enterprise Plan", price: "Custom Pricing", features: ["All Features"] },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Tax Portal</h1>
          <a
            href="#"
            onClick={handleLogout}
            className="text-sm text-black-500 hover:underline"
          >
            Logout
          </a>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Business Subscription Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-6 text-center bg-blue-100 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">{plan.name}</h2>
              <p className="text-lg font-semibold mb-4 text-gray-600">{plan.price}</p>
              <ul className="text-sm mb-4 text-gray-500">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
              <button
                className="bg-primary text-black px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                onClick={() => handlePlanPurchase(plan.name, plan.price)}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessPlans;