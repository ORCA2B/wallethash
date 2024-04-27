/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function ResultPart({ wallets }) {
  const [currentPage, setCurrentPage] = useState(1);
  const walletsPerPage = 10;
  useEffect(() => {
    wallets;
  });

  const indexOfLastWallet = currentPage * walletsPerPage;
  const indexOfFirstWallet = indexOfLastWallet - walletsPerPage;
  const currentWallets = wallets.slice(indexOfFirstWallet, indexOfLastWallet);

  const downloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(currentWallets);
    XLSX.utils.book_append_sheet(wb, ws, "Wallets");
    XLSX.writeFile(wb, "wallets.xlsx");
  };

  function delaydownload() {
    setTimeout(downloadExcel, 10000);
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-[60vh] w-full text-[#f0f1f3] flex justify-center pt-6">
      <div className="w-[53%]">
        <div className="text-2xl ">
          <span className="border-b">wallets {wallets.length}</span>
        </div>

        {currentWallets.map((wallet, index) => (
          <div
            key={index}
            className="border rounded-xl my-3 text-[#00171f] bg-[#fdfffc] pl-4 py-2"
          >
            <p className="flex">
              <span className="mr-1">{wallet.walletAddress}</span>
              <img
                src="icons/clone.svg"
                className="cursor-pointer"
                alt="hey"
                width={18}
                height={18}
                onClick={() => copyToClipboard(wallet.walletAddress)}
              />
            </p>
            <p className="flex">
              <span className="mr-1">{wallet.privateKey}</span>
              <img
                src="icons/clone.svg"
                className="cursor-pointer"
                alt="hey"
                width={18}
                height={18}
                onClick={() => copyToClipboard(wallet.privateKey)}
              />
            </p>
            <p className="flex">
              <span className="mr-1">{wallet.secretPhrases}</span>
              <img
                src="icons/clone.svg"
                className="cursor-pointer"
                alt="hey"
                width={18}
                height={18}
                onClick={() => copyToClipboard(wallet.secretPhrases)}
              />
            </p>
          </div>
        ))}

        <div className="w-full flex justify-end items-end">
          <button
            onClick={delaydownload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-4"
          >
            Download Excel
          </button>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Prev
          </button>
          <button
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentWallets.length < walletsPerPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
