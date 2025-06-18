/* eslint-disable @typescript-eslint/no-unused-vars */
import useUpdateFees from "@/hooks/useUpdateFees";
import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const UpdateFeesComp = () => {
  const [fees, setFees] = useState<string>("");
  const { address: connectedAddress } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { updateFees } = useUpdateFees();

  const handleUpdateFees = async () => {
    const newFees = Number(fees);
    try {
      const result = await updateFees(newFees);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Update Fees</h2>

        <div className="mb-6">
          <label
            htmlFor="admin-address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fees Value:
          </label>
          <input
            id="admin-address"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Ethereum address (0x...)"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          {connectedAddress ? (
            <button
              type="button"
              disabled={isLoading}
              onClick={handleUpdateFees}
              className={`py-3 px-8 rounded-lg font-medium ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }`}
            >
              {isLoading ? "Processing..." : "Update Fees"}
            </button>
          ) : (
            <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button
                onClick={openConnectModal}
                className="bg-blue-900 text-blue-100 rounded-full px-4 py-2 font-semibold hover:bg-blue-600"
              >
                Connect Wallet
              </button>
            )}
          </ConnectButton.Custom>
          )}
        </div>
      </div>
    </div>
  );
};
