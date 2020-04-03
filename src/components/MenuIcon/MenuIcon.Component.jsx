import './MenuIcon.Styles.scss';
import React from 'react';
import { Menu } from 'react-feather';
const MenuIcon = props => {
  return (
    <div
      className="menu-icon"
      style={{ display: props.menu ? 'none' : 'flex' }}
      onClick={() => {
        props.setMenu(true);
      }}
    >
      <Menu className="icon" />
    </div>
  );
};

export default MenuIcon;
