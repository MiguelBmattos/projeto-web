import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDYcW9HghxrkbJX-ZiwX_VQ4GmjrQTiQmk",
  authDomain: "final-4160b.firebaseapp.com",
  projectId: "final-4160b",
  storageBucket: "final-4160b.appspot.com",
  messagingSenderId: "1014272566744",
  appId: "1:1014272566744:web:07cfaa8a0591d4db903ead"
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
