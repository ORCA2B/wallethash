"use client";

import ResultPart from "./ResultPart";

import { ethers } from "ethers";
import { useState } from "react";

export default function Landing() {
  const [wallets, setWallets] = useState([]);
  const [walletsValue, setWalletsValue] = useState();

  const createWallets = async () => {
    const wallet = ethers.Wallet.createRandom();

    const address = wallet.address;
    const mnemonic = wallet.mnemonic.phrase;
    const privateKey = wallet.privateKey;

    const walletInfo = {
      walletAddress: address,
      secretPhrases: mnemonic,
      privateKey,
    };

    setWallets((prevObject) => [...prevObject, walletInfo]);
  };

  const walletLoop = () => {
    for (let i = 0; i < 2090; i++) {
      setTimeout(() => {
        createWallets();
      }, 2500);
    }
  };
  return (
    <div className="min-w-[100vw] flex flex-col justify-center ">
      <div className="h-72 w-full bg-[#f0f1f3] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex ">
            <div>
              <input
                type="number"
                name=""
                id=""
                defaultValue={6}
                className="w-96 h-10 rounded-xl pl-3 border border-[#00a8e8]"
              />
            </div>
            <div>
              <select
                name=""
                id=""
                className="h-10 w-[6.25rem] rounded-xl ml-4 px-1 bg-[#dee2e6]"
              >
                <option value="ethereum">ethereum</option>
                <option value="solana">solana</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={walletLoop}
            className="bg-[#2ec4b6] w-28 h-9 rounded-xl mt-4"
          >
            generate
          </button>
        </div>
      </div>

      <ResultPart wallets={wallets} />
    </div>
  );
}
