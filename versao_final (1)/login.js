import { auth, signInWithEmailAndPassword } from "./gfirebase.js";


// após carregar o DOM...
document.addEventListener('DOMContentLoaded', () => {

  // adiciona event listeners
  document.getElementById('title').addEventListener('click', go_home);

  document.getElementById('login').addEventListener('click', login);
  document.getElementById('register').addEventListener('click', register);

  document.getElementById('email').addEventListener('input', onChangeEmail);
  document.getElementById('password').addEventListener('input', onChangePassword);

});

function login(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "/";
    })
    .catch((error) => {
      const error_message = error.message;
      alert(error_message);
    });
}

function onChangeEmail() {
  toggleButtonDisable();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonDisable();
  togglePasswordErrors();
}

function isEmailValid() {
  const email = document.getElementById("email").value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

function toggleEmailErrors() {
  const email = document.getElementById('email').value;
  if (!email) {
    document.getElementById('email-required-error').style.display = "block";
  } else {
    document.getElementById('email-required-error').style.display = "none";
  }

  if (validateEmail(email)) {
    document.getElementById('email-invalid-error').style.display = "none";
  } else {
    document.getElementById('email-invalid-error').style.display = "block";
  }
}

function togglePasswordErrors() {
  const password = document.getElementById('password').value;
  if (!password) {
    document.getElementById('password-required-error').style.display = "block";
  } else {
    document.getElementById('password-required-error').style.display = "none";
  }
}

function toggleButtonDisable() {
  const emailValid = isEmailValid();
  const passwordValid = isPasswordValid();
  document.getElementById('login').disabled = !emailValid || !passwordValid;
}

function isPasswordValid() {
  const password = document.getElementById('password').value;
  if (!password) {
    return false;
  }
  return true;
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function register(event) {
  event.preventDefault();
  window.location.href = "cadastro.html";
}

function go_home(){
  window.location.href="/";
}
