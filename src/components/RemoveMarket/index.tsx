import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useSettleMarket from "@/hooks/useSettleMarket";
import { abi } from "@/constants/abi";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS } from "@/constants/contract";


export interface Market {
  question: string;
  optionA: string;
  optionB: string;
  endTime: string;
  outcome: string;
  totalOptionAShares: number;
  totalOptionBShares: number;
  resolved: boolean;
}

export const RemoveMarketComp = () => {
  const [id, setId] = useState<string>("");
  const { address: connectedAddress } = useAccount();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { removeMarket } = useSettleMarket();

  const { data: marketData, isLoading: isLoadingMarketData } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getAllMarkets",
    args: [],
  });


  const handleUpdateFees = async () => {
    const MarketId = Number(id);
    try {
      setIsLoading(true)
     await removeMarket({ marketId: MarketId });
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-lg shadow-md p-6 w-[600px] border-2 border-black">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Remove Market</h2>

        <div className="mb-6">
          <label
            htmlFor="market-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Market:
          </label>
          <select
            id="market-select"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={isLoadingMarketData}
          >
            <option value="">-- Select a Market --</option>
            {!isLoadingMarketData &&
              Array.isArray(marketData) &&
              marketData.filter((item:Market)=> item.question!=="none").map((market: Market, index: number) => (
                <option key={index} value={index}>
                  {`${market.question || "Untitled"}`}
                </option>
              ))}
          </select>
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
              {isLoading ? "Processing..." : "Remove"}
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
