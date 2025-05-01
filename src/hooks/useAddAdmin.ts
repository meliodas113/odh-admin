import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "@/constants/contract";
import { useState } from "react";
import { abi } from "@/constants/abi";

function useAddAdmin() {
  const [enableQuery, setEnableQuery] = useState(false);

  const { writeContract, data, error: contractError } = useWriteContract();

  const addAdmin = async (address: string) => {
    try {
      setEnableQuery(true);
      writeContract({
        abi: abi,
        address: CONTRACT_ADDRESS,
        functionName: "addAdmin",
        args: [address],
      });

      return data;
    } catch (err) {
      setEnableQuery(false);
      console.log(err);
    }
  };

  return { addAdmin, enableQuery, contractError };
}

export default useAddAdmin;
