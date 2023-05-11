const accountForm = document.querySelector('form#create-account');
const accountFormButton = accountForm.querySelector('input[type="submit"]');
const accountFormStatus = document.querySelector('div.create-account-status');
const prefillAccountContainer = accountForm.querySelector('.prefill-account');
const prefillAccountCheckbox = accountForm.querySelector('.prefill-account input[type="checkbox"]');

const enablePrefillAccount = () => {
  prefillAccountContainer.style.display = 'block';
}

const disablePrefillAccount = () => {
  prefillAccountContainer.style.display = 'none';
  prefillAccountCheckbox.checked = false;
} 

// Disables the prefill checkbox when country is not US
accountForm
  .querySelector('select[name="country"]')
  .addEventListener('change', async function (event) {
    event.preventDefault();
    const {value} = event.target;
    if (value === 'US') {
      enablePrefillAccount();
    } else {
      disablePrefillAccount();
    }
  });

// Disables the prefill checkbox if the salon type is other
accountForm
  .querySelectorAll('input.business-type-radio')
  .forEach((radio => {
    radio.addEventListener('click', async function (event) {
      const {value} = event.target;
      if (value !== 'other') {
        enablePrefillAccount();
      } else {
        disablePrefillAccount();
      }
    });
  }));

accountForm.addEventListener('submit', async function (event) {
  accountFormButton.setAttribute('disabled', '');
  accountFormButton.value = 'Creating...';
  accountFormStatus.style.display = 'none';

  event.preventDefault();

  const formData = new FormData(accountForm);

  function handleError(errorMsg) {
    accountFormButton.removeAttribute('disabled');
    accountFormButton.value = 'Create account';
    accountFormStatus.style.display = 'block';
    accountFormStatus.querySelector(
      'p'
    ).innerText = `An error occurred while creating an account: ${errorMsg}`;
  }

  try {
    const response = await fetch('/stripe/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        country: formData.get('country'),
        type: formData.get('salon-type'),
        prefill: !!formData.get('prefill'),
        salon: {
          name: formData.get('salon[name]'),
          license: formData.get('salon[license]'),
          specialty: formData.get('salon[specialty]'),
        },
        accountConfiguration: formData.get('accountConfiguration'),
      }),
    });

    if (!response.ok) {
      const json = await response.json();
      handleError(json.error);
    } else {
      window.location.reload();
    }
  } catch (err) {
    handleError(err.message);
  }
});

// Show the dashboard option only when dev === true
const searchParams = new URL(window.location.href).searchParams;
if (searchParams.get('dev') === 'true') {
  const dashboardAccessElement = document.getElementById('account-configuration-section');
  dashboardAccessElement.style.display = 'block';
}
