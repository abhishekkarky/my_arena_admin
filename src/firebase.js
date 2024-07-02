import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDrOn2xxUecp-ymZ64G_Dhg7yh1pjU1ocw",
  authDomain: "my-arena-79797.firebaseapp.com",
  projectId: "my-arena-79797",
  storageBucket: "my-arena-79797.appspot.com",
  messagingSenderId: "737895390793",
  appId: "1:737895390793:web:cd5f0504e0c93b57ee2998",
  measurementId: "G-XNB5LQH115",
};

export const firebase = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebase);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const requestForToken = () => {
  const token = localStorage.getItem("fcmToken");
  return token;
};
