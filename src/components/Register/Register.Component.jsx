import './Register.Styles.scss';
import React from 'react';
import { X, Download, MessageSquare, Mail } from 'react-feather';

import * as firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/database';
import { useState } from 'react';
import { useEffect } from 'react';
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
const isAllowed = 'serviceWorker' in navigator && 'PushManager' in window;
// Initialize Firebase
if (isAllowed) {
  firebase.initializeApp(firebaseConfig);
}

const Register = props => {
  const [notifications, setNotifications] = useState();
  const [messaging, setMessaging] = useState();
  const [formSubmited, setFormSubmited] = useState(false);
  const [installState, setInstallState] = useState(
    localStorage.getItem('installed') ? 'completed' : 'disabled'
  );
  const [installEvent, setInstallEvent] = useState();
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', e => {
      localStorage.setItem('installed', false);
      setInstallState('');
      e.preventDefault();
      setInstallEvent(e);
    });
    if (isAllowed) {
      const messaging = firebase.messaging();
      messaging.usePublicVapidKey(
        'BPN1iIT9CRN7Sd-TdYNTgUJbXvQRB7iizmUI0c0Pm8KbrlmOcKoU5pMTfmxhw45OfWF-MKgQ170orKldnJcyk8w'
      );
      setMessaging(messaging);

      navigator.serviceWorker.getRegistrations().then(registrations => {
        if (registrations.length > 0) {
          setNotifications(true);
        }
      });
    }
  }, []);
  return (
    <div className="">
      <div
        className="register-popup"
        style={{
          display:
            props.registerOpen && document.body.clientWidth > 500
              ? 'flex'
              : props.registerOpen
              ? 'block'
              : 'none'
        }}
      >
        <div className="register-popup-header">
          <div className="register-popup-title">הישארו מעודכנים</div>
          {document.body.clientWidth > 500 ? (
            <p className="register-popup-phrase">
              קבלו עדכונים לגבני התפכות מצב הקורונה בעולם
            </p>
          ) : null}

          <X
            className="register-popup-close"
            onClick={() => props.setRegisterOpen(false)}
          />
        </div>
        <div className="register-popup-container">
          <div
            className="register-popup-item"
            onClick={() => {
              if (installState === '') {
                installEvent.prompt();
                installEvent.userChoice.then(choiceResult => {
                  if (choiceResult.outcome === 'accepted') {
                    setInstallState('completed');
                    localStorage.setItem('installed', true);
                  }
                });
              }
            }}
          >
            <Download className="icon" />
            <p className="action">התקינו את האתר</p>
            <div className={`status ${installState}`}>
              {installState === 'disabled' ? (
                <div className="disabled"></div>
              ) : null}
            </div>
          </div>
          <div
            className="register-popup-item"
            onClick={() => {
              if (isAllowed && !notifications) {
                messaging
                  .requestPermission()
                  .then(() => {
                    setNotifications(true);
                    return messaging.getToken();
                  })
                  .then(token => {
                    firebase
                      .database()
                      .ref('notifications/' + token)
                      .set({
                        token
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            }}
          >
            <MessageSquare className="icon" />
            <p className="action">קבלו עדכונים</p>
            <div
              className={`status ${isAllowed ? '' : 'disabled'}${
                isAllowed && notifications ? 'completed' : ''
              }`}
            >
              {isAllowed ? null : <div className="disabled"></div>}
            </div>
          </div>
          <div className="register-popup-item">
            <Mail className="icon" />
            <p className="action">קבלו עדכונים למייל</p>
            <div className={`status ${formSubmited ? 'completed' : ''}`}></div>
          </div>
          <div
            className="register-popup-form"
            style={{ transform: `${formSubmited ? 'scaleY(0)' : 'scaleY(1)'}` }}
          >
            <input
              type="text"
              name="First name"
              id="fname"
              placeholder="שם פרטי"
            />
            <input
              type="text"
              name="Last name"
              id="lname"
              placeholder="שם משפחה"
            />
            <input type="email" name="email" id="email" placeholder="אימייל" />
            <button
              type="submit"
              className="form-button"
              onClick={e => {
                e.preventDefault();
                setFormSubmited(true);
              }}
            >
              הישארו מעודכנים
            </button>
          </div>
        </div>
      </div>
      {document.body.clientWidth > 500 ? (
        <div
          style={{ display: props.registerOpen ? 'block' : 'none' }}
          className="register-overlay"
          onClick={() => {
            props.setRegisterOpen(false);
          }}
        ></div>
      ) : null}
    </div>
  );
};

export default Register;
