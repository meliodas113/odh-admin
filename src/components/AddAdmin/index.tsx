/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useAccount } from "wagmi";
import useAddAdmin from "@/hooks/useAddAdmin";

export const AddAdmin = () => {
  const [address, setAddress] = useState<string>("");
  const { address: connectedAddress } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addAdmin } = useAddAdmin();
  const handleAddAdmin = async () => {
    if (!address) {
    }

    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      return;
    }

    try {
      const result = await addAdmin(address);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Add New Admin
        </h2>

        <div>
          <label
            htmlFor="admin-address"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Admin Address
          </label>
          <input
            id="admin-address"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="0x123...abc"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleAddAdmin}
            className={`py-3 px-10 rounded-xl font-semibold transition-all duration-200 ${
              isLoading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {isLoading ? "Processing..." : "Add Admin"}
          </button>
        </div>
      </div>
    </div>
  );
};
