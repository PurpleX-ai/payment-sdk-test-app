import "./App.css";
import { useState } from "react";

import PurpleX from "@purplex/payment-sdk";

const App = () => {
  const [apiKey, setApiKey] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [environment, setEnvironment] = useState("dev");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("PurpleX SDK initializing...");
    try {
      const sdk = await PurpleX.init(apiKey, merchantId, { environment });

      console.log("SDK instance:", sdk);

      console.log("PurpleX SDK initialized successfully");

      console.log("Generating QR Code...");

      try {
        const qr = await sdk?.generateQRCode();
        console.log("Generated QR Code:", qr);
        alert("QR Code generated successfully! Check console for details.");
      } catch (error) {
        console.error("Error generating QR Code:", error);
        alert("Failed to generate QR Code. Check console for details.");
      }
    } catch (err) {
      console.error("Error initializing PurpleX SDK:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Form to verify you keys and generate QR code
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2 mr-6">
            API key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            // className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter API key"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2 mr-6">
            Merchant ID
          </label>
          <input
            type="text"
            value={merchantId}
            onChange={(e) => setMerchantId(e.target.value)}
            // className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter Merchant ID"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Environment
          </label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="dev">Dev</option>
            <option value="prod">Prod</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Generate QR
        </button>
      </form>
    </div>
  );
};

export default App;
