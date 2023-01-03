const payoutForm = document.querySelector('form#create-payouts');
const payoutFormButton = payoutForm.querySelector('input[type="submit"]');
const payoutMessageStatus = document.querySelector('div.create-payout-status');

payoutForm.addEventListener('submit', async function (event) {
  payoutFormButton.setAttribute('disabled', '');
  payoutFormButton.value = 'Creating...';

  event.preventDefault();

  try {
    payoutMessageStatus.querySelector('p').innerText = '';
    const response = await fetch('/stripe/payout', {
      method: 'POST',
    });

    payoutMessageStatus.style.display = 'block';
    if (!response.ok) {
      const json = await response.json();
      payoutMessageStatus.querySelector(
        'p'
      ).innerText = `An error occurred while creating payouts: ${json.error}`;
    } else {
      window.location.reload();
    }
  } catch (err) {
    payoutMessageStatus.style.display = 'block';
    payoutMessageStatus.querySelector(
      'p'
    ).innerText = `An error occurred while creating payouts: ${err.message}`;
  }

  payoutFormButton.removeAttribute('disabled');
  payoutFormButton.value = 'Create test payout';
});
