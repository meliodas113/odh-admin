import useSettleMarket from "@/hooks/useSettleMarket";
import { useState } from "react";
import { Radio, RadioGroup } from "rsuite";
import { useAccount} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const SettleMarkets = () => {
  const { address } = useAccount();
  const { settleMarket } = useSettleMarket();

  const [marketId, setMarketId] = useState<number | null>(null);
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Market ID
        </label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter market ID"
          value={marketId ?? ""}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setMarketId(isNaN(val) ? null : val);
          }}
        />
      </div>

      <div className="mb-6">
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
      </div>

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
