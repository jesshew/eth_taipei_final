import React, { useState } from 'react';
import { verifyUser } from '@/lib/worldcoin';

// Constants for customization and reusability
const TITLE = 'Verify Your Humanity';
const DESCRIPTION = 'To protect our community and ensure real connections, please verify your humanity using World ID.';
const BUTTON_TEXT = 'Verify with World ID';
const ERROR_MESSAGE = 'Verification failed. Please try again.';
const LOADING_TEXT = 'Verifying...';

interface VerifyHumanityProps {
  onVerificationSuccess?: () => void;
  onVerificationError?: (error: string) => void;
}

/**
 * VerifyHumanity Component
 * 
 * A component that displays a World ID verification screen and handles
 * the verification process using WorldCoin's verification system.
 * 
 * @param onVerificationSuccess - Optional callback for successful verification
 * @param onVerificationError - Optional callback for verification errors
 */
export const VerifyHumanity: React.FC<VerifyHumanityProps> = ({
  onVerificationSuccess,
  onVerificationError
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerification = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyUser();
      
      if (result.isSuccess) {
        onVerificationSuccess?.();
      } else {
        const errorMessage = result.error || ERROR_MESSAGE;
        setError(errorMessage);
        onVerificationError?.(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGE;
      setError(errorMessage);
      onVerificationError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">{TITLE}</h1>
        <p className="text-gray-600 mb-8">
          {DESCRIPTION}
        </p>
        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}
        <button
          onClick={handleVerification}
          disabled={isLoading}
          className={`bg-dating-purple text-white py-3 px-6 rounded-full font-medium transition-all
            ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
        >
          {isLoading ? LOADING_TEXT : BUTTON_TEXT}
        </button>
      </div>
    </div>
  );
};

export default VerifyHumanity; 