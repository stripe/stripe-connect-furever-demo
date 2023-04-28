const onOnboardingExited = () => {
  console.log('Onboarding exited! We redirect the user to the next page...');
  window.location.href = '/stripe/onboarded';
};

const onboardingElement = document.querySelector(
  'stripe-connect-account-onboarding'
);
onboardingElement.addEventListener('onboardingexited', onOnboardingExited);
