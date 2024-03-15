let loaded = false;
const fetchClientSecret = async () => {
  // Fetch the AccountSession client secret
  const response = await fetch("/account_session", { method: "POST" });
  if (!response.ok) {
    // Handle errors on the client side here
    const { error } = await response.json();
    console.log("An error occurred when creating an account session: ", error);
    return undefined;
  } else {
    const { client_secret: clientSecret } = await response.json();
    return clientSecret;
  }
};

const initConnectJs = async (publishableKey) => {
  const clientSecret = await fetchClientSecret();
  if (clientSecret && !loaded) {
    // Initialize StripeConnect
    // Homebox brand color: #3A713E
    StripeConnect.onLoad = () => {
      loaded = true;
      StripeConnect.init({
        publishableKey,
        clientSecret,
        uiConfig: {
          overlay: "dialog",
        },
        refreshClientSecret: async () => {
          return await fetchClientSecret();
        },
        appearance: {
          colorFeedbackSuccess: "#5953D0",
        },
      });
    };
  }
};
