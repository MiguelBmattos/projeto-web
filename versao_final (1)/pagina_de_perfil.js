import { auth, readUserData } from "./gfirebase.js";

const fullname_div = document.getElementById('fullname');
const username_div = document.getElementById('username');
const email_div = document.getElementById('email');
const adress_div = document.getElementById('adress');
const number_div = document.getElementById('number');
const comp_div = document.getElementById('comp');

// após carregar o DOM ...
document.addEventListener('DOMContentLoaded', () => {

  // Adicionar event listeners
  document.getElementById('title').addEventListener('click', go_home);
  document.getElementById('editar').addEventListener('click', editar);

  // inicializa
  verificaUsuario();

});

function verificaUsuario() {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      console.log(`Usuário ${user.email} logado.`);
      carregar(user);
    } else {
      console.log("Nenhum usuário logado.");
      window.location.href="/";
    }
  });
}

function carregar(user) {
  email_div.innerHTML = user.email;

  readUserData(`users/${user.uid}`)
  .then((result) => {
    const userData = result;
    fullname_div.innerHTML = userData.fullname;
    username_div.innerHTML = userData.username;
    adress_div.innerHTML = userData.adress;
    number_div.innerHTML = userData.number;
    comp_div.innerHTML = userData.comp;
  });

}

function go_home(){
  window.location.href="/";
}

function editar(){
  window.location.href="editar_informacao.html";
}
