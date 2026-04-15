(function () {
  const modal = document.getElementById('waitlist-modal');
  if (!modal) return;

  const openButtons = document.querySelectorAll('[data-open-waitlist]');
  const closeButtons = modal.querySelectorAll('[data-close-waitlist]');
  const dialog = modal.querySelector('.waitlist-dialog');
  const formContainer = modal.querySelector('.newsletter-form-container');
  const form = formContainer.querySelector('.newsletter-form');
  const inputs = Array.from(formContainer.querySelectorAll('.newsletter-form-input'));
  const success = formContainer.querySelector('.newsletter-success');
  const errorContainer = formContainer.querySelector('.newsletter-error');
  const errorMessage = formContainer.querySelector('.newsletter-error-message');
  const backButton = formContainer.querySelector('.newsletter-back-button');
  const submitButton = formContainer.querySelector('.newsletter-form-button');
  const loadingButton = formContainer.querySelector('.newsletter-loading-button');
  let lastFocusedElement = null;

  function showInputs(displayValue) {
    inputs.forEach((input) => {
      input.style.display = displayValue;
    });
  }

  function resetFeedback() {
    dialog.classList.remove('is-success');
    success.style.display = 'none';
    errorContainer.style.display = 'none';
    errorMessage.innerText = 'Oops! Something went wrong, please try again.';
    backButton.style.display = 'none';
    submitButton.style.display = 'flex';
    loadingButton.style.display = 'none';
    showInputs('block');
  }

  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('waitlist-open');
    resetFeedback();
    window.setTimeout(() => {
      inputs[0].focus();
    }, 0);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('waitlist-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function rateLimit() {
    errorContainer.style.display = 'block';
    errorMessage.innerText = 'Too many signups, please try again in a little while';
    submitButton.style.display = 'none';
    showInputs('none');
    backButton.style.display = 'block';
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (event) => {
    if (!dialog.contains(event.target)) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const timestamp = Date.now();
    const previousTimestamp = localStorage.getItem('loops-form-timestamp');
    if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
      rateLimit();
      return;
    }
    localStorage.setItem('loops-form-timestamp', String(timestamp));

    errorContainer.style.display = 'none';
    success.style.display = 'none';
    submitButton.style.display = 'none';
    loadingButton.style.display = 'flex';

    const formBody =
      'userGroup=&mailingLists=&email=' + encodeURIComponent(form.querySelector('input[name="newsletter-form-input"]').value) +
      '&firstName=' + encodeURIComponent(form.querySelector('input[name="firstName"]').value) +
      '&lastName=' + encodeURIComponent(form.querySelector('input[name="lastName"]').value) +
      '&role=' + encodeURIComponent(form.querySelector('input[name="role"]').value);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        dialog.classList.add('is-success');
        success.style.display = 'block';
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        errorContainer.style.display = 'block';
        errorMessage.innerText = data.message || response.statusText;
      }
    } catch (error) {
      if (error && error.message === 'Failed to fetch') {
        rateLimit();
        return;
      }
      errorContainer.style.display = 'block';
      errorMessage.innerText = error && error.message ? error.message : 'Oops! Something went wrong, please try again.';
      localStorage.setItem('loops-form-timestamp', '');
    } finally {
      showInputs('none');
      loadingButton.style.display = 'none';
      backButton.style.display = 'block';
    }
  });

  backButton.addEventListener('click', () => {
    resetFeedback();
    form.reset();
    inputs[0].focus();
  });
})();
