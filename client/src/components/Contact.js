import React from 'react';

// Styles
import styles from '../styles/contact.module.css';

// Components
import Breadcrumbs from './Breadcrumbs';
import FeedbackForm from './Feedback';
import Image from './Image';

// Images
import vkIcon from '../img/svg_icons/vk_icon.svg';
import telegramIcon from '../img/svg_icons/telegram_icon.svg';
import dzenIcon from '../img/svg_icons/dzen_icon.svg';


class ContactInfo extends React.Component {
  render() {
    return (
      <div className={styles.mainContactInfo}>
				<h2 className={styles.contactInfoMainTitle}>Контакты</h2>
				<div className={styles.contactInfoContainer}>
					<div className={styles.contactInfoPhone}>
						<h3 className={styles.contactInfoTitle}>Телефон</h3>
						<a href='tel:+79698117545'><p className={styles.contactInfoText}>+7 (969) 811-75-45</p></a>
						<a href='tel:+79815210512'><p className={styles.contactInfoText}>+7 (981) 521-05-12</p></a>
					</div>
					<div className={styles.contactInfoEmail}>
						<h3 className={styles.contactInfoTitle}>E-mail</h3>
						<a href='mailto:sneakerbuysup@gmail.com'><p className={styles.contactInfoText}>sneakerbuysup@gmail.com</p></a>
						<a href='mailto:sneakerbuysupport@gmail.com'><p className={styles.contactInfoText}>sneakerbuysupport@gmail.com</p></a>
					</div>
					<div className={styles.contactInfoSocial}>
						<h3 className={styles.contactInfoTitle}>Социальные сети</h3>
						<div className={styles.social}>
							<a href='/'>
								<Image image={vkIcon} alt='vk icon' />
								<span className={styles.socialName}>Вконтакте</span>
							</a>
						</div>
						<div className={styles.social}>
							<a href='/'>
								<Image image={telegramIcon} alt='telegram icon' />
								<span className={styles.socialName}>Telegram</span>
							</a>
						</div>
						<div className={styles.social}>
							<a href='/'>
								<Image image={dzenIcon} alt='dzen icon' />
								<span className={styles.socialName}>Дзен</span>
							</a>
						</div>
					</div>
				</div>
			</div>
    )
  }
}

class ContactDetails extends React.Component {
  render() {
    return (
      <div className={styles.mainDetails}>
				<h2 className={styles.detailsTitle}>Реквизиты</h2>
				<p className={styles.detailsText}>ООО "СНИКЕРМОД"<br/>ИНН 7709800524 / ОГРН 1122467245639<br />Юридический адрес: 109028 г. Москва, Серёбриническая наб., дом 27, эт. 2, пом. 1, ком. № 65, 66, 69, 59, 54, 51, 61<br />Тел.: +7 (499) 429-18-82</p>
			</div>
    )
  }
}

class Contact extends React.Component {
  render() {
    const breadcrumbItems = [
      {name: 'Главная', path: '/'},
      {name: 'Контакты', path: '/contact'}
    ];

    return (
      <main className={styles.main}>
        <Breadcrumbs items={breadcrumbItems} />
        <FeedbackForm />
        <ContactInfo />
        <ContactDetails />
      </main>
    )
  }
}

export default Contact;