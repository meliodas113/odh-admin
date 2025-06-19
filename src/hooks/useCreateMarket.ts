/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "@/constants/contract";
import { abi } from "@/constants/abi";

interface Data {
  heading: string;
  category: string;
  outcome1: string;
  outcome2: string;
  deadline: number;
  image: string;
}

function useCreateMarket({
  heading,
  category,
  image,
  outcome1,
  outcome2,
  deadline,
}: Data) {
  const [enableQuery, setEnableQuery] = useState(false);
  const { writeContract, data } = useWriteContract();

  const timeleft = Math.floor((deadline - new Date().getTime()) / 1000);

  const createMarket = async () => {
    try {
      setEnableQuery(true);
      writeContract({
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: "createMarket",
        args: [heading, image, category, outcome1, outcome2, timeleft],
      });
      return data;
    } catch (err) {
      setEnableQuery(false);
      console.log(err);
    }
  };

  return { createMarket };
}

export default useCreateMarket;
