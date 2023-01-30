const showErrors = () => {
  const error = document.querySelector('div.loading-error-message');
  if (error) {
    error.textContent =
      'Something went wrong. Please refresh your page and try again.';
    error.style.display = 'block';
  }
};

const clearErrors = () => {
  const error = document.querySelector('div.loading-error-message');
  if (error) {
    error.style.display = 'none';
  }
};

/**
 *  This function makes a server-side request to the /stripe/create-account-session.
 *  If there is an error, undefined is returned.
 *  Else, the clientSecret and publishableKey are returned.
 */
const createAccountSession = async () => {
  // Fetch the AccountSession client secret
  const response = await fetch('/stripe/create-account-session');
  if (!response.ok) {
    console.error(
      'Failed to obtain account session, could not initialize connect.js'
    );
    return undefined;
  } else {
    const {client_secret: clientSecret, publishable_key: publishableKey} =
      await response.json();
    return {clientSecret, publishableKey};
  }
};

/**
 *  Since the claimed API key expires after a few hours, this will cause API calls
 *  to fail with a 401 unauthorized using an expired API key.
 *  This function makes a server-side request to the /stripe/create-account-session
 *  and returns a new clientSecret in order to claim a new API key.
 */
const fetchClientSecret = async () => {
  const accountSession = await createAccountSession();
  const clientSecret = accountSession?.clientSecret;
  if (clientSecret) {
    clearErrors();
  } else {
    // Handle errors on the client side here
    showErrors();
  }
  return clientSecret;
};

// Connect.js initialization
window.StripeConnect = window.StripeConnect || {};
async function initStripeConnect() {
  const accountSession = await createAccountSession();
  if (accountSession) {
    clearErrors();
    const {clientSecret, publishableKey} = accountSession;
    // Initialize StripeConnect after the window loads
    StripeConnect.onLoad = () => {
      StripeConnect.init({
        publishableKey,
        clientSecret,
        appearance: {
          colors: {
            primary: '#228403',
          },
        },
        uiConfig: {
          overlay: 'dialog',
        },
        refreshClientSecret: fetchClientSecret,
      });
    };
  } else {
    // Handle errors on the client side here
    showErrors();
  }
}
initStripeConnect();
