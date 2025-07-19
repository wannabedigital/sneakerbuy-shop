import React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import Image from './Image';

// Styles
import styles from '../styles/footer.module.css';

// Images
import footerLogoIcon from '../img/website_img/svg_icons/logo_icon_footer.svg';
import vkIcon from '../img/website_img/svg_icons/vk_icon_footer.svg';
import telegramIcon from '../img/website_img/svg_icons/telegram_icon_footer.svg';
import dzenIcon from '../img/website_img/svg_icons/dzen_icon_footer.svg';

class FooterLogo extends React.Component {
    render() {
        return (
            <div className={styles.footerLogo}>
                <Image image={footerLogoIcon} />
            </div>
        )
    }
}

class FooterSupportNav extends React.Component {
    render() {
        return (
            <nav id='support' className={styles.footerNav}>
                <h2 id='supportTitle' className={styles.footerNavTitle}>Поддержка</h2>
                <NavLink to='/'>FAQ</NavLink>
                <NavLink to='/'>Доставка и оплата</NavLink>
                <NavLink to='/'>Возврат</NavLink>
                <NavLink to='/'>Партнеры</NavLink>
            </nav>
        )
    }
}

class FooterInfoNav extends React.Component {
    render() {
        return (
            <nav id='info' className={styles.footerNav}>
                <h2 id='infoTitle' className={styles.footerNavTitle}>Информация</h2>
                <NavLink to='/contact'>Контакты</NavLink>
                <NavLink to='/'>Магазины</NavLink>
                <NavLink to='/'>Пункты выдачи</NavLink>
                <NavLink to='/'>Вакансии</NavLink>
            </nav>
        )
    }
}

class FooterSocialsNav extends React.Component {
    render() {
        return (
            <nav id='socials' className={styles.footerNav}>
                <h2 id='socialsTitle' className={styles.footerNavTitle}>Социальные сети</h2>
                <NavLink to='/'><Image image={vkIcon} alt='vk icon' />Вконтакте</NavLink>
                <NavLink to='/'><Image image={telegramIcon} alt='telegram icon' />Telegram</NavLink>
                <NavLink to='/'><Image image={dzenIcon} alt='dzen icon' />Дзен</NavLink>
            </nav>
        )
    }
}

class FooterPhoneNav extends React.Component {
    render() {
        return (
            <nav id='phone' className={styles.footerNav}>
                <h2 id='phoneTitle' className={styles.footerNavTitle}>Телефон</h2>
                <a href="tel:+79698117545">+7 (969) 811 75 45</a>
                <a href="tel:+79815210512">+7 (981) 521 05 12</a>
            </nav>
        )
    }
}

class FooterUpper extends React.Component {
    render() {
        return (
            <section className={styles.footerUpper}>
                <FooterLogo />
                <div className={styles.footerContent}>
                    <FooterSupportNav />
                    <FooterInfoNav />
                    <FooterSocialsNav />
                    <FooterPhoneNav />
                </div>
            </section>
        )
    }
}

class FooterLower extends React.Component {
    render() {
        return (
            <section className={styles.footerLower}>
                <span className={styles.footerCopyright}>© SneakersBuy, 2025</span>
            </section>
        )
    }
}

class Footer extends React.Component {
 render() {
    return (
        <footer className={styles.footer}>
            <FooterUpper />
            <div className={styles.footerBar}></div>
            <FooterLower />
        </footer>
    );
 }
}

export default Footer;