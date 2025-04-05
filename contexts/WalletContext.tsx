"use client";

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

// Define the context type
interface WalletContextType {
  address: string | undefined;
  isConnecting: boolean;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

// Create the context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Constants
const WALLET_CONNECT_ERROR = 'Failed to connect wallet';

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnecting, setIsConnecting] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      await connectAsync({ connector: injected() });
    } catch (error) {
      console.error(WALLET_CONNECT_ERROR, error);
      throw new Error(WALLET_CONNECT_ERROR);
    } finally {
      setIsConnecting(false);
    }
  }, [connectAsync]);

  const disconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const value = {
    address,
    isConnecting,
    isConnected,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

// Custom hook to use the wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 