importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDrOn2xxUecp-ymZ64G_Dhg7yh1pjU1ocw",
  authDomain: "my-arena-79797.firebaseapp.com",
  projectId: "my-arena-79797",
  storageBucket: "my-arena-79797.appspot.com",
  messagingSenderId: "737895390793",
  appId: "1:737895390793:web:cd5f0504e0c93b57ee2998",
  measurementId: "G-XNB5LQH115",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.clients.matchAll().then((clients) => {
    if (clients && clients.length) {
      clients.forEach((client) => {
        client.postMessage(payload);
      });
    }
  });
});
