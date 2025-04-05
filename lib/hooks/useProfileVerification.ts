import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { PROFILE_VERIFICATION_ABI, PROFILE_VERIFICATION_CONTRACT_ADDRESS } from '@/lib/contracts/config';

export const useProfileVerification = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initContract = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            PROFILE_VERIFICATION_CONTRACT_ADDRESS,
            PROFILE_VERIFICATION_ABI,
            signer
          );
          setContract(contract);

          // Check if profile is verified
          const verified = await contract.isProfileVerified(await signer.getAddress());
          setIsVerified(verified);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    initContract();
  }, []);

  const verifyProfile = async (message: string) => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }

    try {
      setLoading(true);
      const tx = await contract.verifyProfile(message);
      await tx.wait();
      setIsVerified(true);
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async (address: string) => {
    if (!contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const profile = await contract.getProfile(address);
      return {
        userAddress: profile[0],
        message: profile[1],
        timestamp: profile[2],
        isVerified: profile[3],
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    contract,
    isVerified,
    loading,
    error,
    verifyProfile,
    getProfile,
  };
};