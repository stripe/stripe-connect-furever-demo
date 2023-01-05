const accountForm = document.querySelector('form#create-account');
const accountFormButton = accountForm.querySelector('input[type="submit"]');
const accountFormStatus = document.querySelector('div.create-account-status');

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
        salon: {
          name: formData.get('salon[name]'),
          license: formData.get('salon[license]'),
          specialty: formData.get('salon[specialty]'),
        },
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
