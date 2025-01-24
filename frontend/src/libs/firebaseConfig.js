import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "firebase project api key",
  authDomain: "firebase project auth domain",
  projectId: "firebase project id",
  storageBucket: "firebase project bucket",
  messagingSenderId: "firebase messaging id",
  appId: "firebase project app id",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
