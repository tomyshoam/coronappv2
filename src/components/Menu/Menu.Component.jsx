import React from 'react';
import './Menu.Styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faFlagCheckered,
  faGlobeEurope,
  faBell,
  faCode,
  faBook,
  faPlusSquare,
  faAt
} from '@fortawesome/free-solid-svg-icons';
const Menu = props => {
  return (
    <div className="menu">
      <div
        onClick={() => props.setMenu(!props.menu)}
        className="menu-overlay"
        style={{ display: `${props.menu ? 'block' : 'none'}` }}
      ></div>
      <div
        className="menu-nav"
        style={{ right: `${props.menu ? '0' : '-280px'}` }}
      >
        <h1 className="header">אפליקציית הקורונה</h1>
        <div className="sections">
          <div className="section-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
            <p className="title">מפה</p>
          </div>
          <div className="section-item">
            <FontAwesomeIcon icon={faFlagCheckered} className="icon" />
            <p className="title">מדינות</p>
          </div>
          <div className="section-item">
            <FontAwesomeIcon icon={faGlobeEurope} className="icon" />
            <p className="title">גלובלי</p>
          </div>
          <div className="section-item">
            <FontAwesomeIcon icon={faBell} className="icon" />
            <p className="title">הישארו מעודכנים</p>
          </div>
          <div className="section-item">
            <FontAwesomeIcon icon={faCode} className="icon" />
            <p className="title">הטביעו</p>
          </div>
          <div className="section-item">
            <FontAwesomeIcon icon={faBook} className="icon" />
            <p className="title">קרדיט ומקורות</p>
          </div>
          <div className="section-item">
            <FontAwesomeIcon icon={faPlusSquare} className="icon" />
            <p className="title">דווחו על מקרה</p>
          </div>
          <div className="section-item">
            <FontAwesomeIcon icon={faAt} className="icon" />
            <p className="title">צור קשר</p>
          </div>
        </div>
        <button className="donate-btn">
          <img src="./assets/coffee-buy.png" alt="Coffee" className="coffee" />
          קנו לנו קפה
        </button>
        <div className="preferences">
          <h4 className="title">העדפות</h4>
          <div className="theme">
            <h4 className="theme-name">ערכת נושא</h4>
            <div className="dark-mode-toggle">
              <input
                type="checkbox"
                id="toggleDark"
                defaultChecked={localStorage.getItem('theme') === 'dark'}
                onChange={e => {
                  e.target.checked
                    ? props.setTheme('dark')
                    : props.setTheme('light');
                  e.target.checked
                    ? localStorage.setItem('theme', 'dark')
                    : localStorage.setItem('theme', 'light');
                }}
              />
              <label htmlFor="toggleDark"></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;