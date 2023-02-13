const paymentForm = document.querySelector('form#create-payments');
const paymentFormButton = paymentForm.querySelector('input[type="submit"]');
const paymentMessageStatus = document.querySelector(
  'div.create-payments-status'
);
const currencyRow = document.querySelector('#currency-row');

// Disables the currency selector when not using a successful payment status
paymentForm
  .querySelector('select[name="status"]')
  .addEventListener('change', async function (event) {
    event.preventDefault();
    const {value} = event.target;
    if (value.startsWith('card_successful')) {
      currencyRow.style.display = 'flex';
    } else {
      currencyRow.style.display = 'none';
    }
  });

paymentForm.addEventListener('submit', async function (event) {
  paymentFormButton.setAttribute('disabled', '');
  paymentFormButton.value = 'Creating...';
  paymentMessageStatus.querySelector('p.success').style.display = 'none';
  paymentMessageStatus.querySelector('p.error').style.display = 'none';

  event.preventDefault();

  const formData = new FormData(paymentForm);

  function handleError(errorMsg) {
    paymentFormButton.removeAttribute('disabled');
    paymentFormButton.value = 'Create test payments';
    paymentMessageStatus.querySelector('p.success').style.display = 'none';
    paymentMessageStatus.querySelector('p.error').style.display = 'block';
    paymentMessageStatus.querySelector(
      'p.error'
    ).innerText = `An error occurred while creating payments: ${errorMsg}`;
  }

  try {
    const response = await fetch('/stripe/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        count: formData.get('count'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        currency: formData.get('currency'),
      }),
    });

    if (!response.ok) {
      const json = await response.json();
      handleError(json.error);
    } else {
      paymentFormButton.removeAttribute('disabled');
      paymentFormButton.value = 'Create test payments';
      paymentMessageStatus.querySelector('p.success').style.display = 'block';
      paymentMessageStatus.querySelector('p.error').style.display = 'none';
    }
  } catch (err) {
    handleError(err.message);
  }
});

const createCheckoutSession = async (event) => {
  paymentMessageStatus.querySelector('p.error').style.display = 'none';

  event.preventDefault();

  function handleError(errorMsg) {
    paymentMessageStatus.querySelector('p.error').style.display = 'block';
    paymentMessageStatus.querySelector(
      'p.error'
    ).innerText = `An error occurred while creating a checkout session: ${errorMsg}`;
  }

  try {
    const response = await fetch('/stripe/checkout', {
      method: 'GET',
    });
    const json = await response.json();
    if (!response.ok) {
      handleError(json.error);
    } else {
      const {checkoutSession} = json;
      window.location.href = checkoutSession;
    }
  } catch (err) {
    handleError(err.message);
  }
};
