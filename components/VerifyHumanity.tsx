import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyUser } from '@/lib/worldcoin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, XCircle } from "lucide-react";

// Constants for customization and reusability
const TITLE = 'Verify Your Humanity';
const DESCRIPTION = 'To protect our community and ensure real connections, please verify your humanity using World ID.';
const BUTTON_TEXT = 'Verify with World ID';
const ERROR_MESSAGE = 'Verification failed. Please try again.';
const LOADING_TEXT = 'Verifying...';
const SUCCESS_MESSAGE = 'Verification successful! Redirecting you to the app...';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVerification = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyUser();
      
      if (result.isSuccess) {
        setIsSuccess(true);
        onVerificationSuccess?.();
        // Redirect to main page after a short delay to show success message
        setTimeout(() => {
          router.push('/');
        }, 1500);
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto h-16 w-16 text-dating-purple">
            <Shield className="h-16 w-16" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">{TITLE}</CardTitle>
            <CardDescription className="text-base">
              {DESCRIPTION}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg">
              <XCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center space-x-2 text-green-500 bg-green-50 p-3 rounded-lg">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{SUCCESS_MESSAGE}</p>
            </div>
          )}

          <Button
            onClick={handleVerification}
            disabled={isLoading || isSuccess}
            className="w-full bg-gradient-to-r from-dating-purple to-dating-pink hover:bg-dating-purple/90 h-12 text-base"
          >
            {isLoading ? LOADING_TEXT : BUTTON_TEXT}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyHumanity; 