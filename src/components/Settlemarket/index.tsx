import useSettleMarket from "@/hooks/useSettleMarket";
import { useState } from "react";
import { Radio, RadioGroup } from "rsuite";
import { useAccount} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { abi } from "@/constants/abi";
import { CONTRACT_ADDRESS } from "@/constants/contract";
import { useReadContract } from "wagmi";
import { Market } from "../RemoveMarket";

const SettleMarkets = () => {
  const { address } = useAccount();
  const { settleMarket } = useSettleMarket();
  const [marketId, setMarketId] = useState<number | null>(null);
  const { data: marketData, isLoading: isLoadingMarketData } = useReadContract({
    abi,
    address: CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getAllMarkets",
    args: [],
  });
  const [outcome, setOutcome] = useState<"Yes" | "No">("Yes");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSettleMarket = async () => {
    if (!marketId || marketId <= 0) {
      alert("Please enter a valid Market ID.");
      return;
    }

    setIsSubmitting(true);
    try {
      await settleMarket({
        marketId,
        winning_outcome: outcome === "Yes" ? 1 : 2,
      });
    } catch (err) {
      console.error("Settlement failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full max-w-md mx-auto p-4">
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
            value={marketId as number}
            onChange={(e) => setMarketId(Number(e.target.value))}
            disabled={isLoadingMarketData}
          >
            <option value="">-- Select a Market --</option>
            {!isLoadingMarketData &&
              Array.isArray(marketData) &&
              marketData.filter((item:Market)=> item.question!=="none" && Number(item.endTime) < Math.floor((new Date().getTime())/1000)).map((market: Market, index: number) => (
                <option key={index} value={index}>
                  {`${market.question || "Untitled"}`}
                </option>
              ))}
          </select>
        </div>

     {!isLoadingMarketData &&
     Array.isArray(marketData) && marketData.filter((item:Market)=> item.question!=="none" && Number(item.endTime) < Math.floor((new Date().getTime())/1000)).length > 0 &&  <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Winning Outcome
        </label>
        <RadioGroup
          name="outcome"
          value={outcome}
          onChange={(value) => setOutcome(value as "Yes" | "No")}
          inline
        >
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </RadioGroup>
      </div>}

      <div className="flex justify-center mt-8">
        {address ? (
          <button
            type="button"
            onClick={handleSettleMarket}
            disabled={isSubmitting}
            className={`py-3 px-8 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Settle Market"}
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
  );
};

export default SettleMarkets;
