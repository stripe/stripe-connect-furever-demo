const ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT = 'enable_embedded_account_management';
const ENABLE_EMBEDDED_ONBOARDING = 'enable_embedded_onboarding';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const isEmbeddedAccountManagementEnabled =
  urlParams.get(ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT) === 'true';
const isEmbeddedOnboardingEnabled =
  urlParams.get(ENABLE_EMBEDDED_ONBOARDING) === 'true';
const isEmbeddedEnabled =
  isEmbeddedAccountManagementEnabled && isEmbeddedOnboardingEnabled;

const enableEmbeddedCheckbox = document.querySelector(
  'input[name="enable-embedded"]'
);
if (enableEmbeddedCheckbox) {
  enableEmbeddedCheckbox.checked = isEmbeddedEnabled;

  enableEmbeddedCheckbox.addEventListener('change', () => {
    const currentUrl = new URL(window.location.href);
    if (isEmbeddedEnabled) {
      currentUrl.searchParams.delete(ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT);
      currentUrl.searchParams.delete(ENABLE_EMBEDDED_ONBOARDING);
    } else {
      currentUrl.searchParams.set(ENABLE_EMBEDDED_ACCOUNT_MANAGEMENT, 'true');
      currentUrl.searchParams.set(ENABLE_EMBEDDED_ONBOARDING, 'true');
    }
    window.location.href = currentUrl.toString();
  });
}
