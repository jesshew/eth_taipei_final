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

          try {
            // Check if profile is verified using verifiedProfiles mapping
            const userAddress = await signer.getAddress();
            const profile = await contract.verifiedProfiles(userAddress);
            setIsVerified(profile.isVerified);
          } catch (verificationErr) {
            console.error('Error checking verification:', verificationErr);
            setIsVerified(false);
          }
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
      
      // After verification, update the status
      const signer = await (contract.runner as ethers.Signer).getAddress();
      const profile = await contract.verifiedProfiles(signer);
      setIsVerified(profile.isVerified);
      
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
      // Use verifiedProfiles mapping instead of getProfile function
      const profile = await contract.verifiedProfiles(address);
      return {
        userAddress: profile.userAddress,
        message: profile.message,
        timestamp: Number(profile.timestamp),
        isVerified: profile.isVerified,
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