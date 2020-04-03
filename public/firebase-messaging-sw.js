importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');

let firebaseConfig = {
  apiKey: 'AIzaSyBc3-u9epJH1uL8AYWY9iKLayfLgSkjUgc',
  authDomain: 'coronapp-ff886.firebaseapp.com',
  databaseURL: 'https://coronapp-ff886.firebaseio.com',
  projectId: 'coronapp-ff886',
  storageBucket: 'coronapp-ff886.appspot.com',
  messagingSenderId: '718942130305',
  appId: '1:718942130305:web:a5695a251dd507aa59fd80',
  measurementId: 'G-P1KP449GEK'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  const title = 'Hello world';
  const options = payload.data;
  return self.registration.showNotification(title, options);
});
