import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { PROFILE_VERIFICATION_ABI, PROFILE_VERIFICATION_CONTRACT_ADDRESS } from '@/lib/contracts/config';

export const useProfileVerification = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          // Get the provider and signer
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          // Get user's address
          const address = await signer.getAddress();
          setUserAddress(address);

          // Create contract instance
          const contract = new ethers.Contract(
            PROFILE_VERIFICATION_CONTRACT_ADDRESS,
            PROFILE_VERIFICATION_ABI,
            signer
          );

          // Check if profile is verified
          const verified = await contract.isProfileVerified(address);
          setIsVerified(verified);
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const verifyProfile = async (message: string) => {
    try {
      setLoading(true);
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        PROFILE_VERIFICATION_CONTRACT_ADDRESS,
        PROFILE_VERIFICATION_ABI,
        signer
      );

      // Call verifyProfile function
      const tx = await contract.verifyProfile(message);
      await tx.wait();

      // Check updated verification status
      const verified = await contract.isProfileVerified(userAddress);
      setIsVerified(verified);

      return tx;
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    userAddress,
    isVerified,
    loading,
    error,
    verifyProfile
  };
};