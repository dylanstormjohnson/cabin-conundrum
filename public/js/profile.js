const usernameFormEl = document.querySelector('#update-username-form');
const passwordFormEl = document.querySelector('#update-password-form');
const user_id = document.getElementById('user_id').getAttribute('id_value');

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

const usernameFormHandler = async (event) => {
  event.preventDefault();
  removeAllErrors();

  const username = document.querySelector('#username-update').value.trim();

  if (!username) {
    showError(usernameFormEl, 'Please provide a username!.');
    return;
  }

  const bodyObj = {
    username,
  };

  try {
    const response = await fetch(`/api/users/username/${user_id}`, {
      method: 'PUT',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.message;
      showError(usernameFormEl, errorMsg);
      return;
    }

    alert('username updated successfully!');
  } catch (err) {
    console.log(err);
    showError(usernameFormEl, 'An error occured');
  }
};

const passwordFormHandler = async (event) => {
  event.preventDefault();
  removeAllErrors();

  const password = document.querySelector('#password-update').value.trim();
  const confirmPassword = document
    .querySelector('#confirm-password-update')
    .value.trim();

  if (!password) {
    showError(passwordFormEl, 'Enter a password!');
    return;
  }

  if (password !== confirmPassword) {
    showError(passwordFormEl, "Passwords don't match!");
    return;
  }

  const bodyObj = {
    password,
  };

  try {
    const response = await fetch(`/api/users/password/${user_id}`, {
      method: 'PUT',
      body: JSON.stringify(bodyObj),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.message;
      showError(passwordFormEl, errorMsg);
      return;
    }

    alert('password updated successfully!');
  } catch (err) {
    console.log('ERROR', err);
    showError(passwordFormEl, 'An error occured');
  }
};

usernameFormEl.addEventListener('submit', usernameFormHandler);

passwordFormEl.addEventListener('submit', passwordFormHandler);
