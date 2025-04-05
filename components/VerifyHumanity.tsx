import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyUser } from '@/lib/worldcoin';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, XCircle, Heart, UserCheck, Users } from "lucide-react";

// Constants for customization and reusability
const APP_NAME = 'MINI AMOR';
const TAGLINE = 'Dating, Reimagined.';
const DESCRIPTION = 'Authentic connections between real humans';
const VALUE_PROPS = [
  {
    icon: UserCheck,
    title: 'Human Verification',
    description: 'Every profile verified through World ID'
  },
  {
    icon: Users,
    title: 'Zero Fake Profiles',
    description: 'No bots, no catfish, no exceptions'
  },
  {
    icon: Heart,
    title: 'Meaningful Matches',
    description: 'Quality connections with real people'
  }
];
const BUTTON_TEXT = 'Verify with World ID';
const ERROR_MESSAGE = 'Verification failed. Please try again.';
const LOADING_TEXT = 'Verifying...';
const SUCCESS_MESSAGE = 'Success! Welcome to MINI AMOR';

interface VerifyHumanityProps {
  onVerificationSuccess?: () => void;
  onVerificationError?: (error: string) => void;
}

/**
 * VerifyHumanity Component
 * 
 * A modern, visually impactful verification screen using World ID
 * with optimized layout - verification card after taglines and compact feature props
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
    <div className="min-h-screen bg-gradient-to-br from-dating-purple/5 via-background to-dating-pink/5 flex flex-col items-center justify-center p-4">
      {/* Hero Section with Glass Effect */}
      <div className="w-full max-w-5xl text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-dating-purple/10 to-dating-pink/10 rounded-3xl blur-3xl -z-10" />
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-dating-purple to-dating-pink rounded-full blur-lg opacity-50" />
            <Shield className="h-12 w-12 text-white relative" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-dating-purple to-dating-pink text-transparent bg-clip-text">
            {APP_NAME}
          </h1>
        </div>
        
        <h2 className="text-3xl font-semibold mb-4 tracking-tight">{TAGLINE}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{DESCRIPTION}</p>
        
        {/* Verification Card - Moved Up After Taglines */}
        <Card className="max-w-md mx-auto bg-background/80 backdrop-blur-lg border border-dating-purple/20 overflow-hidden mb-8">
          <div className="h-2 bg-gradient-to-r from-dating-purple to-dating-pink" />
          <CardContent className="pt-8 pb-8 space-y-6">
            {error && (
              <div className="flex items-center space-x-3 text-red-500 bg-red-50 p-4 rounded-xl">
                <XCircle className="h-6 w-6 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {isSuccess && (
              <div className="flex items-center space-x-3 text-green-500 bg-green-50 p-4 rounded-xl">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                <p>{SUCCESS_MESSAGE}</p>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-center text-muted-foreground text-sm">
                Verify your identity once, connect authentically forever
              </p>
              <Button
                onClick={handleVerification}
                disabled={isLoading || isSuccess}
                className="w-full bg-gradient-to-r from-dating-purple to-dating-pink hover:opacity-90 transition-all duration-300 h-14 text-base font-medium rounded-xl shadow-lg shadow-dating-purple/20"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    {LOADING_TEXT}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5" />
                    {BUTTON_TEXT}
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Value Props - Made Smaller */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {VALUE_PROPS.map((prop, index) => (
            <Card key={index} className="bg-background/40 backdrop-blur-md border border-dating-purple/20 hover:border-dating-purple/40 transition-all duration-300">
              <CardContent className="pt-4 pb-4 px-4 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="p-2 rounded-full bg-gradient-to-br from-dating-purple/10 to-dating-pink/10">
                    <prop.icon className="h-5 w-5 text-dating-purple" />
                  </div>
                </div>
                <h3 className="text-base font-medium mb-1">{prop.title}</h3>
                <p className="text-xs text-muted-foreground">{prop.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subtle Testimonial */}
        <div className="mt-6 text-center max-w-lg mx-auto">
          <p className="text-xs italic text-muted-foreground">
            "MINI AMOR has completely changed the way I approach online dating. 
            No more wasted time on fake profiles — just real connections."
          </p>
          <p className="text-xs mt-1 font-medium">— Our *Only* User, Emily</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyHumanity;