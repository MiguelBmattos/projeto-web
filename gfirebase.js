import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2OJO2qJqhUeosRPwahZJu5CxnVgw8D4I",
  authDomain: "loja-final-3830c.firebaseapp.com",
  projectId: "loja-final-3830c",
  storageBucket: "loja-final-3830c.appspot.com",
  messagingSenderId: "514482828882",
  appId: "1:514482828882:web:f6bde9407d3e1b9d94d18b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

const dbRef = ref(database);

// Função para ler dados de um path
export async function readUserData(dataPath) {
  try {
    const snapshot = await get(child(dbRef, dataPath));
    if (snapshot.exists()) {
      const pathData = snapshot.val();
      console.log('Dados:', pathData);
      return pathData
    } else {
      console.log('Nenhum dado disponível');
    }
  } catch (error) {
    console.error('Erro ao ler os dados:', error);
  }
  return null
}

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  ref,
  set,
  get,
  child,
  push
};
