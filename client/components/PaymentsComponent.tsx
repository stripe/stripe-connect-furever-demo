import React, { useEffect, useState } from "react";
import { loadConnect } from "@stripe/connect-js";
import {
  ConnectPayments,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

export const PaymentsComponent = () => {
  const [hasError, setHasError] = useState(false);
  const [stripeConnectInstance, setStripeConnectInstance] = useState<any>(null);

  const fetchClientSecret = async () => {
    // Fetch the AccountSession client secret
    const response = await fetch('/account_session', { method: "POST" });
    if (!response.ok) {
      // Handle errors on the client side here
      const {error} = await response.json();
      console.log('An error occurred: ', error);
      setHasError(true);
      return undefined;
    } else {
      const {client_secret: clientSecret} = await response.json();
      setHasError(false);
      return clientSecret;
    }
  }

  useEffect(() => {
    let stripeConnect;
    (async () => {
      try {
        stripeConnect = await loadConnect();
      } catch (error) {
        setHasError(true);
        return;
      }
      const clientSecret = await fetchClientSecret();
      if (clientSecret) {
        // Initialize StripeConnect after the window loads
          const instance = stripeConnect.initialize({
            // This is a placeholder - it should be replaced with your publishable API key.
            // Sign in to see your own test API key embedded in code samples.
            // Don’t submit any personally identifiable information in requests made with this key.
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            clientSecret,
            appearance: {
              colorPrimary: '#625afa',
            },
            uiConfig: {
              overlay: 'dialog',
            },
            refreshClientSecret: async () => {
              return await fetchClientSecret();
            }
          });
          setStripeConnectInstance(instance);
      }
    })();
  }, []);

  if (hasError) {
    return <div className="container">'Something went wrong!'</div>;
  }

  return (
    <div className="container">
      {stripeConnectInstance && (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectPayments />
        </ConnectComponentsProvider>
      )}
    </div>
  )
}