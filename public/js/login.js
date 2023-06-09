const loginFormEl = document.querySelector('#login-form');
const signupFormEl = document.querySelector('#signup-form');

const showError = (parentEl, errorText) => {
  const errorPEl = document.createElement('p');
  errorPEl.classList.add('error-element');
  errorPEl.textContent = errorText;
  parentEl.appendChild(errorPEl);
};

const removeAllErrors = () => {
  const allErrors = document.querySelectorAll('.error-element');
  allErrors.forEach((el) => el.remove());
};

const loginFormHandler = async (event) => {
  event.preventDefault();
  removeAllErrors();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (!username || !password) {
    showError(loginFormEl, 'Please provide both a username and password.');
    return;
  }

  const bodyObj = {
    username,
    password,
  };

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.message;
      showError(loginFormEl, errorMsg);
      return;
    }

    window.location.href = '/';
  } catch (err) {
    console.log(err);
    showError(loginFormEl, 'A login error has ocurred.');
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  removeAllErrors();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  const bodyObj = {
    username,
    password,
  };

  if (!username || !password) {
    console.log(bodyObj);
    showError(signupFormEl, 'Please fill out all fields.');
    return;
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.message;
      showError(signupFormEl, errorMsg);
      return;
    }

    window.location.href = '/';
  } catch (err) {
    console.log('ERROR', err);
    showError(signupFormEl, err.message);
  }
};

loginFormEl.addEventListener('submit', loginFormHandler);

signupFormEl.addEventListener('submit', signupFormHandler);
