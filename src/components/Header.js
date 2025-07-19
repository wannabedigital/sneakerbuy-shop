import React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import Image from './Image';
import HeaderCart from './Cart';

// Styles
import styles from '../styles/header.module.css';

// Imports
import logoIcon from '../img/website_img/svg_icons/logo_icon.svg';


class HeaderLogo extends React.Component {
  render() {
    return (
      <div className={styles.headerLogo}>
        <NavLink to='/' className={styles.logo}>
          <Image image={logoIcon} alt='logo' />
          SneakerBuy
        </NavLink>
      </div>
    );
  }
}

class HeaderNav extends React.Component {
  render() {
    return (
        <nav className={styles.nav}>
          <NavLink
            to='/'
            end
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Главная
          </NavLink>
          <NavLink
            to='/catalog'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Каталог
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            О сервисе
          </NavLink>
          <NavLink
            to='/contact'
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Контакты
          </NavLink>
        </nav>
    );
  }
}

class HeaderPhone extends React.Component {
  render() {
    return (
      <div className={styles.headerPhoneNumber}>
        <a className={styles.phoneNumber} href='tel:+79810903369'>
          +7 981 090-33-69
        </a>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <HeaderLogo />
        <HeaderNav />
        <HeaderPhone />
        <HeaderCart />
      </header>
    );
  }
}

export default Header;