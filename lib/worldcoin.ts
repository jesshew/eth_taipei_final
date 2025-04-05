import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js'

// Constants
const VERIFY_ACTION = 'verify-dating'
const VERIFY_SIGNAL = '0x12312'
const PAYMENT_RECIPIENT = '0xf54204cd8e7d73d73b2a259c6d9b1450bbdafce0'
const PAYMENT_AMOUNT = 0.002

// Types
interface VerificationResult {
  isSuccess: boolean;
  error?: string;
}

// Haptic feedback functions
export const sendHapticFeedback = () => {
  console.log('Sending haptic feedback command');
  MiniKit.commands.sendHapticFeedback({
    hapticsType: 'impact',
    style: 'light',
  })
}

export const sendStrongHapticFeedback = () => {
  console.log('Sending strong haptic feedback command');
  MiniKit.commands.sendHapticFeedback({
    hapticsType: 'impact',
    style: 'heavy',
  })
}

export const sendSuccessNotification = () => {
  console.log('Sending success notification');
  MiniKit.commands.sendHapticFeedback({
    hapticsType: 'notification',
    style: 'success',
  })
}
export const sendPayment = async (): Promise<boolean> => {
    sendStrongHapticFeedback()
    const payload: PayCommandInput = {
      reference: "hi-testing",
      to: PAYMENT_RECIPIENT,
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(PAYMENT_AMOUNT, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(PAYMENT_AMOUNT, Tokens.USDCE).toString(),
        },
      ],
      description: 'Test example payment for minikit',
    }
  
    const { finalPayload } = await MiniKit.commandsAsync.pay(payload)
    return finalPayload.status === 'success';
  }

// Payment function
export const payWithWorldcoin = async (paymentAmount: number, description: string): Promise<boolean> => {
    sendStrongHapticFeedback()
    const payload: PayCommandInput = {
        reference: "hi-testing",
        to: PAYMENT_RECIPIENT,
        tokens: [
        {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(paymentAmount, Tokens.WLD).toString(),
        },
        {
            symbol: Tokens.USDCE,
            token_amount: tokenToDecimals(paymentAmount, Tokens.USDCE).toString(),
        },
        ],
        description: description,
    }

    const { finalPayload } = await MiniKit.commandsAsync.pay(payload)
    return finalPayload.status === 'success';
}

// Verification functions
export const verifyUser = async (): Promise<VerificationResult> => {
  if (!MiniKit.isInstalled()) {
    return { isSuccess: false, error: 'MiniKit not installed' };
  }

  const verifyPayload: VerifyCommandInput = {
    action: VERIFY_ACTION,
    signal: VERIFY_SIGNAL,
    verification_level: VerificationLevel.Orb,
  }

  try {
    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload)
    
    if (finalPayload.status === 'error') {
      return { isSuccess: false, error: 'Verification failed' };
    }

    const verifyResponse = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult,
        action: VERIFY_ACTION,
        signal: VERIFY_SIGNAL,
      }),
    })

    const verifyResponseJson = await verifyResponse.json()
    return { isSuccess: verifyResponseJson.status === 200 };
  } catch (error) {
    return { isSuccess: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// App ID helper
export const getAppId = (): string | null => {
  const envAppId = process.env.APP_ID;
  if (!envAppId) {
    console.warn('APP_ID not found in environment variables');
    return null;
  }
  return envAppId;
} 