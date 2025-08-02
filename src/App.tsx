import "./App.css";
import { useState } from "react";
import PurpleX from "@purplex/payment-sdk";
import * as uuid from "uuid";

const App = () => {
  const [apiKey, setApiKey] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [amount, setAmount] = useState(0);
  const [environment, setEnvironment] = useState<"dev" | "prod" | undefined>(
    "dev"
  );

  const [showQR, setShowQR] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("PurpleX SDK initializing...");
    try {
      const sdk = await PurpleX.init(apiKey, merchantId, { environment });

      console.log("SDK instance:", sdk);

      console.log("PurpleX SDK initialized successfully");

      console.log("Generating QR Code...");

      try {
        const qr = await sdk?.generateQRCode({ amount, currency: "INR", orderId: uuid.v4() });
        console.log("Generated QR Code:", qr);
        alert("QR Code generated successfully! Check console for details.");
        setShowQR(qr);
      } catch (error) {
        console.error("Error generating QR Code:", error);
        alert("Failed to generate QR Code. Check console for details.");
      }
    } catch (err: unknown) {
      console.error("Error initializing PurpleX SDK:", err);
      alert((err as Error)?.message || err);
    }
  };

  const resetData = () => {
    setApiKey("");
    setMerchantId("");
    setAmount(0);
    setEnvironment("dev");
    setShowQR("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">

      {showQR ? (


        <div className="mt-8 flex flex-col items-center justify-center relative bg-white border rounded-lg shadow-md p-6 w-full max-w-sm mx-auto">
          {/* Close button */}
          <button
            onClick={resetData}
            className="absolute top-2 right-2 font-bold cursor-pointer"
            aria-label="Close QR"
          >
            X
            {/* Or use: <span className="text-xl">×</span> */}
          </button>

          {/* Heading */}
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
            Payment QR
          </h2>

          {/* QR Code */}
          <div className="flex items-center justify-center mb-4">
            <img src={showQR} alt="Payment QR Code" className="w-128 h-128" />
          </div>

        </div>

      ) :
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
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Environment
            </label>
            <select
              value={environment}
              onChange={(e) =>
                setEnvironment(e.target.value as "dev" | "prod" | undefined)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="dev">Dev</option>
              <option value="prod">Prod</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 mr-6">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              // className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter Amount"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Generate QR
          </button>
        </form>
      }
    </div>
  );
};

export default App;
