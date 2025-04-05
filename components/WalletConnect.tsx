"use client";

import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { formatAddress } from "@/lib/utils";
import { Wallet } from "lucide-react";

export function WalletConnect() {
  const { address, isConnecting, isConnected, connectWallet, disconnectWallet } = useWallet();

  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        onClick={disconnectWallet}
        className="bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
      >
        <Wallet className="h-4 w-4 mr-2 text-dating-purple" />
        {formatAddress(address)}
      </Button>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-gradient-to-r from-dating-purple to-dating-pink text-white hover:opacity-90"
    >
      <Wallet className="h-4 w-4 mr-2" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
} 