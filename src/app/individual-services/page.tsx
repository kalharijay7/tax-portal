"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const IndividualServices = () => {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    // Clear session cookie
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Tax Portal</h1>
          <a
            href="#"
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </a>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Individual Services
        </h1>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border rounded-md px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <p className="mt-4 text-sm text-gray-600">
            You entered: <span className="font-semibold">{amount || "0"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualServices;