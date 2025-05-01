"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useCreateMarket from "@/hooks/useCreateMarket";
import "rsuite/dist/rsuite-no-reset.min.css";
import Box from "@mui/material/Box";
import Select from "react-select";
import { DatePicker } from "rsuite";
import { colorStyles } from "@/constants/contract";
import { categories } from "@/constants/config";
import SettleMarkets from "@/components/Settlemarket";
import { AddAdmin } from "@/components/AddAdmin";
import { UpdateFeesComp } from "@/components/UpdateFees";
import { RemoveMarketComp } from "@/components/RemoveMarket";

export default function Home() {
  const [heading, setHeading] = useState("");
  const [category, setCategory] = useState("");
  const [outcome1, setOutcome1] = useState("");
  const [outcome2, setOutcome2] = useState("");
  const [deadline, setDeadline] = useState(Number(new Date().getTime) / 1000);
  const [image, setImage] = useState<string>("");
  const [canCreate, setCanCreate] = useState(false);

  const { address } = useAccount();

  useEffect(() => {
    if (address === undefined || image === "") {
      setCanCreate(false);
    } else {
      setCanCreate(true);
    }
  }, [address, image]);
  const [action, setAction] = useState(0);

  const { createMarket } = useCreateMarket({
    heading,
    category,
    outcome1,
    outcome2,
    deadline,
    image,
  });
  useEffect(() => {
    const validateMarket = () => {
      if (
        heading == "" ||
        outcome1 == "" ||
        outcome2 == "" ||
        image == "" ||
        category == ""
      ) {
        setCanCreate(false);
        return;
      }

      setCanCreate(true);
      return;
    };
    validateMarket();
  }, [category, heading, image, outcome1, outcome2]);
  return (
    <main className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <div className="flex items-center justify-between mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          🧠 OddsHub Admin Dashboard
        </h1>
      </div>
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          "Settle Market",
          "Create Market",
          "Add Admin",
          "Update Fees",
          "Remove Market",
        ].map((label, i) => (
          <button
            key={label}
            className={`py-2 px-6 rounded-lg font-medium transition-all duration-200 shadow-sm ${
              action === i
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setAction(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {action === 1 && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 max-w-3xl mx-auto space-y-8">
          {/* Market Heading */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Market Heading
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="e.g. Trump vs Biden"
              required
            />
          </div>

          {/* Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Outcome 1", value: outcome1, setValue: setOutcome1 },
              { label: "Outcome 2", value: outcome2, setValue: setOutcome2 },
            ].map(({ label, value, setValue }, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  {label}
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={label === "Outcome 1" ? "Yes" : "No"}
                  required
                />
              </div>
            ))}
          </div>

          {/* Category & Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Category
              </label>
              <Select
                className="w-full"
                styles={colorStyles}
                options={categories}
                onChange={(category) => {
                  if (category?.value) setCategory(category.value);
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Deadline
              </label>
              <DatePicker
                className="w-full"
                placeholder="Select Deadline"
                format="MM/dd/yyyy HH:mm"
                onChange={(value) => setDeadline(value?.getTime() as number)}
                value={new Date(deadline)}
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Image URL
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              disabled={!canCreate}
              onClick={() => createMarket()}
              className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
                canCreate
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {address ? "Create Market" : "Connect Wallet"}
            </button>
          </div>
        </div>
      )}

      {action === 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Settle Existing Markets
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <SettleMarkets />
          </div>
        </section>
      )}

      {action === 2 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Admin
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <AddAdmin />
          </div>
        </section>
      )}

      {action === 3 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Update Platform Fees
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <UpdateFeesComp />
          </div>
        </section>
      )}

      {action === 4 && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Remove Market
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <RemoveMarketComp />
          </div>
        </section>
      )}
    </main>
  );
}
