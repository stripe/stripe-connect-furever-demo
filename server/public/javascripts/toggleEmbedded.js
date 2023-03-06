const ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT = 'enable_embedded_account_management';
const ENABLE_EMBEDDED_ONBOARDING = 'enable_embedded_onboarding';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Embedded account management
const isEmbeddedAccountManagementEnabled =
  urlParams.get(ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT) === 'true';

const embeddedAccountManagementCheckbox = document.querySelector(
  'input[name="embedded-account-management"]'
);
if (embeddedAccountManagementCheckbox) {
  embeddedAccountManagementCheckbox.checked =
    isEmbeddedAccountManagementEnabled;

  embeddedAccountManagementCheckbox.addEventListener('change', () => {
    const currentUrl = new URL(window.location.href);
    if (isEmbeddedAccountManagementEnabled) {
      currentUrl.searchParams.delete(ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT);
    } else {
      currentUrl.searchParams.set(ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT, 'true');
    }
    window.location.href = currentUrl.toString();
  });
}

// Embedded onboarding
const isEmbeddedOnboardingEnabled =
  urlParams.get(ENABLE_EMBEDDED_ONBOARDING) === 'true';

const embeddedOnboardingCheckbox = document.querySelector(
  'input[name="embedded-onboarding"]'
);
if (embeddedOnboardingCheckbox) {
  console.log(isEmbeddedOnboardingEnabled);
  embeddedOnboardingCheckbox.checked = isEmbeddedOnboardingEnabled;

  embeddedOnboardingCheckbox.addEventListener('change', () => {
    const currentUrl = new URL(window.location.href);
    console.log('CHANGE');
    if (isEmbeddedOnboardingEnabled) {
      currentUrl.searchParams.delete(ENABLE_EMBEDDED_ONBOARDING);
    } else {
      currentUrl.searchParams.set(ENABLE_EMBEDDED_ONBOARDING, 'true');
    }
    window.location.href = currentUrl.toString();
  });
}
