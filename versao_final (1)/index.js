import { auth, ref, get, database, child, push } from "./gfirebase.js";
import { prod_grupos, produtos } from "./dados_loja.js";

// atributos
var user_auth = null;

// após carregar o DOM...
document.addEventListener('DOMContentLoaded', () => {

  // adiciona event listeners nos elementos do menu esquerdo
  document.getElementById('home-btn').addEventListener('click', home_btn);
  document.getElementById('carrinho-btn').addEventListener('click', () => {
    nao_implementada('Carrinho');
  });
  document.getElementById('pedidos-btn').addEventListener('click', () => {
    nao_implementada('Meus pedidos');
  });
  document.getElementById('perfil-btn').addEventListener('click', perfil_btn);
  document.getElementById('logout-btn').addEventListener('click', logout);

  // monta dados da loja
  monta_vitrine();

  // inicializa
  verificaUsuario();

})

// elementos

const username_el = document.getElementById('username');

const logout_btn_el = document.getElementById('logout-btn');
const logout_span_el = document.getElementById('logout-span');
const perfil_btn_el = document.getElementById('perfil-btn');
const perfil_span_el = document.getElementById('perfil-span');

const prod_tab_modelo_el = document.getElementById('prod-tab-modelo');
const prod_card_modelo_el = document.getElementById('prod-card-modelo');

// montagem inicial

function monta_vitrine() {
  monta_cards_produtos();
  monta_tabs_grupos();
}

function monta_cards_produtos() {
  for (var [id, produto] of Object.entries(produtos)) {

    const novo_card = prod_card_modelo_el.cloneNode(true);
    novo_card.id = `prod-${id}`;
    novo_card.setAttribute("data-codigo", id);
    novo_card.setAttribute("data-nome", produto.nome);
    novo_card.setAttribute("data-valor", produto.preco);
    novo_card.classList.add(`prod-${produto.tipo}`);

    novo_card.addEventListener('click', (event) => {
      compraProduto(event);
    });

    const card_img = novo_card.querySelector("img");
    card_img.src = produto.img_src;

    const card_name = novo_card.querySelector(".name-product");
    card_name.innerHTML = produto.nome;

    const card_valor = novo_card.querySelector(".prod-valor");
    card_valor.innerHTML = produto.preco;

    prod_card_modelo_el.parentNode.insertBefore(
      novo_card, prod_card_modelo_el);
  }
}

function monta_tabs_grupos() {
  var a_el = null;
  for (var [key, value] of Object.entries(prod_grupos).reverse()) {
    const nova_tab = prod_tab_modelo_el.cloneNode(true);
    a_el = nova_tab.childNodes[0];
    a_el.innerHTML = value;
    a_el.id = `prod-${key}`;
    a_el.addEventListener('click', (event) => {
      mostraProdutos(event);
    });

    prod_tab_modelo_el.parentNode.insertBefore(
      nova_tab, prod_tab_modelo_el.nextSibling);
  }
  a_el.click();
  prod_tab_modelo_el.style.display = 'none';
}

// ações menu esquerdo

function home_btn(){
  window.location.href="/";
}

function nao_implementada(pagina){
  alert('Página de `'+pagina+'` não implementada')
}

function perfil_btn() {
  if (user_auth === null) {
    window.location.href="cadastro.html";
  } else {
    window.location.href="pagina_de_perfil.html";
  }
}

function logout(){
  if (user_auth === null) {
    window.location.href = "login.html";
  } else {
    auth.signOut().then(() => {
      window.location.href = "login.html";
    }).catch(() => {
      alert('Erro ao fazer logout');
    })
  }
}

// ação das tabs de tipo de produto

function mostraProdutos(event) {
  const tipo = event.target.id;
  const prods = document.querySelectorAll('.produto');
  prods.forEach((el) => {
    const selecionado = el.classList.contains(tipo);
    if (selecionado) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });

  const tabs = document.querySelectorAll('.prod-tab');
  tabs.forEach((el) => {
    if (el.id == tipo) {
      el.classList.add('tab-on');
    } else {
      el.classList.remove('tab-on');
    }
  });
}

// ação dos cards de produto

function compraProduto(event) {
  if (user_auth === null) {
    alert("Você deve estar logado para comprar");
    return
  }
  var produto_card = event.target;
  while (produto_card.nodeName != "DIV") {
    var produto_card = produto_card.parentNode;
  }

  const nome = produto_card.getAttribute("data-nome");
  const valor = produto_card.getAttribute("data-valor");
  if ( window.confirm(`Confirma comprar 1 "${nome}" por R$ ${valor},00?`) ) {
    grava_compra(nome, valor);
  }
}

function grava_compra(nome, valor) {
  const newPedido = {
    data: new Date().toISOString(), // Formato ISO 8601
    produto: nome,
    precoUnitario: valor,
  };
  const user_ref = ref(database, `users/${user_auth.uid}`);
  
  // Adiciona o pedido ao path "pedidos" do usuário
  push(child(user_ref, 'pedidos'), newPedido)
  .then(snapshot => {
      console.log('Pedido adicionado com sucesso:', snapshot.key);
      alert(`Usuário "${user_auth.email}" comprou 1 "${nome}" por R$ ${valor},00`);
    })
  .catch(error => {
      console.error('Erro ao adicionar pedido:', error);
      alert("Erro ao executar compra");
  });
}

// Mostra usuário corrente e dá outros tratamentos

function verificaUsuario() {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      user_auth = user;
      console.log(`Usuário ${user.email} logado.`);
      username_el.innerHTML = user.email;
    } else {
      user_auth = null;
      console.log("Nenhum usuário logado.");
      username_el.innerHTML = '&nbsp;';
    }
    ajustaTextoBotoes();
  });
}

function ajustaTextoBotoes() {
  if (user_auth === null) {
    logout_btn_el.title = "Login";
    logout_span_el.innerHTML = "Login";
    perfil_btn_el.title = "Cadastro";
    perfil_span_el.innerHTML = "Cadastro";
  } else {
    logout_btn_el.title = "Sair";
    logout_span_el.innerHTML = "Sair";
    perfil_btn_el.title = "Perfil";
    perfil_span_el.innerHTML = "Perfil";
  }
}
