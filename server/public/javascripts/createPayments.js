const paymentForm = document.querySelector('form#create-payments');
const paymentFormButton = paymentForm.querySelector('input[type="submit"]');
const paymentMessageStatus = document.querySelector(
  'div.create-payments-status'
);

paymentForm.addEventListener('submit', async function (event) {
  paymentFormButton.setAttribute('disabled', '');
  paymentFormButton.value = 'Creating...';

  event.preventDefault();

  const formData = new FormData(paymentForm);

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
      }),
    });

    paymentMessageStatus.style.display = 'block';
    if (!response.ok) {
      const json = await response.json();
      paymentMessageStatus.querySelector(
        'p'
      ).innerText = `An error occurred while creating payments: ${json.error}`;
    }
  } catch (err) {
    paymentMessageStatus.style.display = 'block';
    paymentMessageStatus.querySelector(
      'p'
    ).innerText = `An error occurred while creating payments: ${err.message}`;
  }

  paymentFormButton.removeAttribute('disabled');
  paymentFormButton.value = 'Create test payments';
});

const createCheckoutSession = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/stripe/checkout', {
      method: 'GET',
    });
    paymentMessageStatus.style.display = 'block';
    const json = await response.json();
    if (!response.ok) {
      paymentMessageStatus.querySelector(
        'p'
      ).innerText = `An error occurred while creating a checkout session: ${json.error}`;
    } else {
      const {checkoutSession} = json;
      window.location.href = checkoutSession;
    }
  } catch (err) {
    paymentMessageStatus.style.display = 'block';
    paymentMessageStatus.querySelector(
      'p'
    ).innerText = `An error occurred while creating a checkout session: ${err.message}`;
  }
};
