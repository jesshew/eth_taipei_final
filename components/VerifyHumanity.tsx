import React, { useState } from 'react';
import { verifyUser } from '@/lib/worldcoin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Shield, CheckCircle2, XCircle } from "lucide-react";

// Constants for customization and reusability
const TITLE = 'Verify Your Humanity';
const DESCRIPTION = 'To protect our community and ensure real connections, please verify your humanity using World ID.';
const BUTTON_TEXT = 'Verify with World ID';
const ERROR_MESSAGE = 'Verification failed. Please try again.';
const LOADING_TEXT = 'Verifying...';
const SUCCESS_MESSAGE = 'Verification successful! You can now continue using the app.';

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleVerification = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyUser();
      
      if (result.isSuccess) {
        setIsSuccess(true);
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

  const handleClose = () => {
    if (isSuccess) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4 h-12 w-12 text-dating-purple">
            <Shield className="h-12 w-12" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold">{TITLE}</DialogTitle>
          <DialogDescription className="text-center">
            {DESCRIPTION}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          {error && (
            <div className="flex items-center space-x-2 text-red-500">
              <XCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center space-x-2 text-green-500">
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm">{SUCCESS_MESSAGE}</p>
            </div>
          )}

          <Button
            onClick={handleVerification}
            disabled={isLoading || isSuccess}
            className="w-full bg-dating-purple hover:bg-dating-purple/90"
          >
            {isLoading ? LOADING_TEXT : BUTTON_TEXT}
          </Button>

          {isSuccess && (
            <Button
              onClick={handleClose}
              variant="outline"
              className="w-full"
            >
              Continue
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyHumanity; 