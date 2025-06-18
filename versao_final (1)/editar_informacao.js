import { auth, set, ref, database, readUserData } from "./gfirebase.js";

// atributos
var user_auth = null;

// get elements
const confirmar_btn = document.getElementById('confirmar');

const fullname_input = document.getElementById('fullname');
const username_input = document.getElementById('username');
const email_input = document.getElementById('email');
const adress_input = document.getElementById('adress');
const number_input = document.getElementById('number');
const comp_input = document.getElementById('comp');

// após carregar o DOM ...
document.addEventListener('DOMContentLoaded', () => {

  // Adicionar event listeners
  confirmar_btn.addEventListener('click', gravar);

  fullname_input.addEventListener('input', onChangeName);
  username_input.addEventListener('input', onChangeUserName);
  email_input.addEventListener('input', onChangeEmail);
  adress_input.addEventListener('input', onChangeAdress);
  number_input.addEventListener('input', onChangeNumber);
  comp_input.addEventListener('input', onChangeComp);

  // inicializa
  verificaUsuario();

});

function verificaUsuario() {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      console.log(`Usuário ${user.email} logado.`);
      user_auth = user
      carregar();
    } else {
      console.log("Nenhum usuário logado.");
      window.location.href="/";
    }
  });
}

function carregar() {
  email_input.value = user_auth.email;

  readUserData(`users/${user_auth.uid}`)
  .then((result) => {
    const userData = result;
    fullname_input.value = userData.fullname;
    username_input.value = userData.username;
    adress_input.value = userData.adress;
    number_input.value = userData.number;
    comp_input.value = userData.comp;
  });

}

function gravar(event) {
  event.preventDefault();

  const fullname = fullname_input.value;
  const username = username_input.value;
  const email = email_input.value;
  const adress = adress_input.value;
  const number = number_input.value;
  const comp = comp_input.value;

  const user_data = {
    fullname: fullname,
    username: username,
    email: email,
    adress: adress,
    number: number,
    comp: comp
  };

  set(ref(database, 'users/' + user_auth.uid), user_data)
  .then(() => {
    // alert('Usuário gravado com sucesso!');
    window.location.href = "pagina_de_perfil.html";
  })
  .catch((error) => {
    console.error('Erro ao gravar os dados do usuário:', error);
    alert('Erro ao gravar os dados do usuário');
  });

}

function onChangeEmail() {
  toggleButtonDisable();
  toggleEmailErrors();
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
  const fullname = fullname_input.value;
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
  const username = username_input.value;
  if (!username) {
    document.getElementById('username-required-error').style.display = "block"
  } else {
    document.getElementById('username-required-error').style.display = "none";
  }
}

function toggleEmailErrors() {
  const email = email_input.value;
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



function toggleAdressErrors() {
  const adress = adress_input.value;
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
  const number = number_input.value;
  if (!number) {
    document.getElementById('number-required-error').style.display = "block"
  } else {
    document.getElementById('number-required-error').style.display = "none";
  }
}

function toggleCompErrors() {
  const comp = comp_input.value;
  if (!comp) {
    document.getElementById('comp-required-error').style.display = "block"
  } else {
    document.getElementById('comp-required-error').style.display = "none";
  }
}

function toggleButtonDisable() {
  const emailValid = isEmailValid();
  const nameValid = isNameValid();
  const userNameValid = isUserNameValid();
  const adressValid = isAdressValid();
  const numberValid = isNumberValid();
  const compValid = isCompValid();
  confirmar_btn.disabled = (
    !emailValid ||
    !nameValid ||
    !userNameValid ||
    !adressValid ||
    !numberValid ||
    !compValid
  );
}

function isNameValid() {
  const fullname = fullname_input.value;
  if (!fullname) {
    return false;
  }
  return validateName(fullname);
}

function isUserNameValid() {
  const username = username_input.value;
  if (!username) {
    return false;
  }
  return true;
}

function isAdressValid() {
  const adress = adress_input.value;
  if (!adress) {
    return false;
  }
  return validateAdress(adress);
}

function isNumberValid() {
  const number = number_input.value;
  if (!number) {
    return false;
  }
  return true;
}

function isCompValid() {
  const comp = comp_input.value;
  if (!comp) {
    return false;
  }
  return true;
}

function validateAdress(adress) {
  return /^[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/.test(adress)
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validateName(fullname) {
  return /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/.test(fullname);
}
