import useSettleMarket from "@/hooks/useSettleMarket";
import { useState } from "react";
import { Radio, RadioGroup } from "rsuite";
import { useAccount, useSwitchChain } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { etherlink } from "viem/chains";

const SettleMarkets = () => {
  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { settleMarket } = useSettleMarket();

  const [marketId, setMarketId] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<"Yes" | "No">("Yes");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSwitchNetwork = (show: (() => void) | undefined, chain: any) => {
    if (show) show();
    if (chain?.id !== etherlink.id) {
      switchChain({ chainId: etherlink.id });
    }
  };

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
          <ConnectKitButton.Custom>
            {({ isConnected, show, address, chain }) => {
              const displayAddress = address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet";

              return (
                <button
                  onClick={() => handleSwitchNetwork(show, chain)}
                  className={`relative min-w-[10rem] px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 overflow-hidden shadow-md ${
                    isConnected
                      ? "bg-[#10b981] hover:bg-[#059669]"
                      : "bg-[#3b82f6] hover:bg-[#2563eb]"
                  } text-white`}
                >
                  <span className="relative z-10">
                    {isConnected ? displayAddress : "Connect Wallet"}
                  </span>
                  <span className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500 group-hover:left-full" />
                </button>
              );
            }}
          </ConnectKitButton.Custom>
        )}
      </div>
    </div>
  );
};

export default SettleMarkets;
