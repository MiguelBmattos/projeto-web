import { auth, database, set, ref, createUserWithEmailAndPassword } from "./gfirebase.js";

// após carregar o DOM...
document.addEventListener('DOMContentLoaded', () => {

  // Adicionar event listeners
  document.getElementById('finalizar').addEventListener('click', finalizar);

  document.getElementById('email').addEventListener('input', onChangeEmail);
  document.getElementById('password').addEventListener('input', onChangePassword);
  document.getElementById('fullname').addEventListener('input', onChangeName);
  document.getElementById('username').addEventListener('input', onChangeUserName);
  document.getElementById('adress').addEventListener('input', onChangeAdress);
  document.getElementById('number').addEventListener('input', onChangeNumber);
  document.getElementById('comp').addEventListener('input', onChangeComp);
});

function finalizar() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const fullname = document.getElementById('fullname').value;
  const username = document.getElementById('username').value;
  const adress = document.getElementById('adress').value;
  const number = document.getElementById('number').value;
  const comp = document.getElementById('comp').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const user_data = {
        email: email,
        fullname: fullname,
        username: username,
        adress: adress,
        number: number,
        comp: comp
      };

      set(ref(database, 'users/' + user.uid), user_data)
      .then(() => {
        // alert('Usuário cadastrado com sucesso!');
        window.location.href = "/";
      })
      .catch((error) => {
        console.error('Erro ao salvar os dados do usuário:', error);
        alert('Erro ao salvar os dados do usuário');
      });

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

function onChangeName() {
  toggleButtonDisable();
  toggleNameErrors();
}

function onChangeUserName() {
  toggleButtonDisable();
  toggleUserNameErrors();
}

function onChangeAdress() {
  toggleButtonDisable();
  toggleAdressErrors();
}

function onChangeNumber() {
  toggleButtonDisable();
  toggleNumberErrors();
}

function onChangeComp() {
  toggleButtonDisable();
  toggleCompErrors();
}

function isEmailValid() {
  const email = document.getElementById("email").value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

function toggleNameErrors() {
  const fullname = document.getElementById('fullname').value;
  if (!fullname) {
    document.getElementById('fullname-required-error').style.display = "block";
  } else {
    document.getElementById('fullname-required-error').style.display = "none";
  }

  if (validateName(fullname)) {
    document.getElementById('fullname-invalid-error').style.display = "none";
  } else {
    document.getElementById('fullname-invalid-error').style.display = "block";
  }
}

function toggleUserNameErrors() {
  const username = document.getElementById('username').value;
  if (!username) {
    document.getElementById('username-required-error').style.display = "block";
  } else {
    document.getElementById('username-required-error').style.display = "none";
  }
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

function toggleAdressErrors() {
  const adress = document.getElementById('adress').value;
  if (!adress) {
    document.getElementById('adress-required-error').style.display = "block";
  } else {
    document.getElementById('adress-required-error').style.display = "none";
  }

  if (validateAdress(adress)) {
    document.getElementById('adress-invalid-error').style.display = "none";
  } else {
    document.getElementById('adress-invalid-error').style.display = "block";
  }
}

function toggleNumberErrors() {
  const number = document.getElementById('number').value;
  if (!number) {
    document.getElementById('number-required-error').style.display = "block";
  } else {
    document.getElementById('number-required-error').style.display = "none";
  }
}

function toggleCompErrors() {
  const comp = document.getElementById('comp').value;
  if (!comp) {
    document.getElementById('comp-required-error').style.display = "block";
  } else {
    document.getElementById('comp-required-error').style.display = "none";
  }
}

function toggleButtonDisable() {
  const emailValid = isEmailValid();
  const passwordValid = isPasswordValid();
  const nameValid = isNameValid();
  const userNameValid = isUserNameValid();
  const adressValid = isAdressValid();
  const numberValid = isNumberValid();
  const compValid = isCompValid();

  document.getElementById('finalizar').disabled = !emailValid || !passwordValid || !nameValid || !userNameValid || !adressValid || !numberValid || !compValid;
}

function isNameValid() {
  const fullname = document.getElementById('fullname').value;
  if (!fullname) {
    return false;
  }
  return validateName(fullname);
}

function isUserNameValid() {
  const username = document.getElementById('username').value;
  if (!username) {
    return false;
  }
  return true;
}

function isPasswordValid() {
  const password = document.getElementById('password').value;
  if (!password) {
    return false;
  }
  return true;
}

function isAdressValid() {
  const adress = document.getElementById('adress').value;
  if (!adress) {
    return false;
  }
  return validateAdress(adress);
}

function isNumberValid() {
  const number = document.getElementById('number').value;
  if (!number) {
    return false;
  }
  return true;
}

function isCompValid() {
  const comp = document.getElementById('comp').value;
  if (!comp) {
    return false;
  }
  return true;
}

function validateAdress(adress) {
  return /^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/.test(adress);
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validateName(fullname) {
  return /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/.test(fullname);
}
