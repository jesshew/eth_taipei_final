'use client' // Required for Next.js

import { ReactNode, useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

// Define the payment event interface
interface PaymentEvent {
	status: 'success' | 'error' | 'pending';
	transactionHash?: string;
	error?: string;
}

// Extend MiniKit type to include event methods
declare module '@worldcoin/minikit-js' {
	export class MiniKit {
		static on(event: string, callback: (event: PaymentEvent) => void): void;
		static off(event: string): void;
		static install(appId: string): void;
		// ... other existing static methods
	}
}

export default function MiniKitProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		// Passing appId in the install is optional
		// but allows you to access it later via `window.MiniKit.appId`
		MiniKit.install('app_7d9479b0459e77d4fad4d5cf5ddb7cc3');

		// Add event handlers for payment events
		MiniKit.on('miniapp-payment', (event) => {
			console.log('Payment event received:', event);
			// Handle the payment event here
			// You can dispatch actions, update state, or perform other operations
		});

		// Cleanup event listeners on unmount
		return () => {
			MiniKit.off('miniapp-payment');
		};
	}, [])

	return <>{children}</>
}
