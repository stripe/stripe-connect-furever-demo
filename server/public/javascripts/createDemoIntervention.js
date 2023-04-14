const interventionForm = document.querySelector(
    'form#create-demo-intervention'
  );
  const interventionFormButton = interventionForm.querySelector(
    'input[type="submit"]'
  );
  const interventionMessageStatus = document.querySelector(
    'div.create-intervention-status'
  );
  
  interventionForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    interventionFormButton.setAttribute('disabled', '');
    interventionFormButton.value = 'Creating...';
    interventionMessageStatus.querySelector('p.success').style.display = 'none';
    interventionMessageStatus.querySelector('p.error').style.display = 'none';
  
    try {
      const response = await fetch('/stripe/intervention', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      function handleError(errorMsg) {
        interventionFormButton.removeAttribute('disabled');
        interventionFormButton.value = 'Create test notification';
        interventionMessageStatus.querySelector('p.success').style.display = 'none';
        interventionMessageStatus.querySelector('p.error').style.display = 'block';
        interventionMessageStatus.querySelector(
          'p.error'
        ).innerText = `An error occurred while creating notifications: ${errorMsg}`;
      }
  
      if (!response.ok) {
        const json = await response.json();
        handleError(json.error);
      } else {
        interventionFormButton.removeAttribute('disabled');
        interventionFormButton.value = 'Create test notification';
        interventionMessageStatus.querySelector('p.success').style.display = 'block';
        interventionMessageStatus.querySelector('p.error').style.display = 'none';
      }
    } catch (err) {
      handleError(err);
    }
  });