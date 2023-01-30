const payoutForm = document.querySelector('form#create-payouts');
const payoutFormButton = payoutForm.querySelector('input[type="submit"]');
const payoutMessageStatus = document.querySelector('div.create-payout-status');

payoutForm.addEventListener('submit', async function (event) {
  payoutFormButton.setAttribute('disabled', '');
  payoutFormButton.value = 'Creating...';
  payoutMessageStatus.style.display = 'none';

  event.preventDefault();

  function handleError(errorMsg) {
    payoutFormButton.removeAttribute('disabled');
    payoutFormButton.value = 'Create test payout';
    payoutMessageStatus.style.display = 'block';
    payoutMessageStatus.querySelector(
      'p'
    ).innerText = `An error occurred while creating payouts: ${errorMsg}`;
  }

  try {
    const response = await fetch('/stripe/payout', {
      method: 'POST',
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
