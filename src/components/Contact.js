import React from 'react';

// Styles
import styles from '../styles/contact.module.css';

// Components
import Breadcrumbs from './Breadcrumbs';

class FeedbackRequestSection extends React.Component {
  render() {
    return (
      <section className={styles.feedbackRequest}>
        <h2 className={styles.feedbackSectionTitle}>Обращение</h2>
        <div id='feedbackTypeSelect' className={styles.inputField}>
          <p><label htmlFor='feedbackType'>Выберите тип обращения</label></p>
          <select id='feedbackType' name='type' placeholder='Тип обращения' required>
            <option value='' disabled selected>Тип обращения</option>
            <option value='gratitude'>Благодарность</option>
            <option value='complaint'>Жалоба</option>
            <option value='suggestion'>Совет</option>
          </select>
        </div>
        <div id='orderNumberInput' className={styles.inputField}>
          <p><label htmlFor='orderNumber'>Введите номер заказа</label></p>
          <input type='text' id='orderNumber' placeholder='Номер заказа' required />
        </div>
        <div id='messageInput' className={styles.inputField}>
          <p><label htmlFor='message'>Ваше обращение</label></p>
          <textarea className={styles.messageTextarea} placeholder='Обращение' required />
        </div>
      </section>
    )
  }
}

class FeedbackPersonalSection extends React.Component {
  render() {
    return (
      <section className={styles.feedbackPersonal}>
        <h2 className={styles.feedbackSectionTitle}>Данные о себе</h2>
        <div id='nameInput' className={styles.inputField}>
          <p><label htmlFor='fullName'>Фамилия Имя</label></p>
          <input type='text' id='fullName' placeholder='Фамилия Имя' required />
        </div>
        <div id='orderNumberInput' className={styles.inputField}>
          <p><label htmlFor='phoneNum'>Номер телефона</label></p>
          <input type='tel' id='phoneNum' placeholder='Телефон' required />
        </div>
        <div id='messageInput' className={styles.inputField}>
          <p><label htmlFor='email'>E-mail</label></p>
          <input type='email' id='email' placeholder='E-mail' required />
        </div>
        <div id='agreement' className={styles.inputField}>
          <div>
            <input type='checkbox' id='feedbackRequestCheckbox' className={styles.checkboxInput} />
            <span class={styles.customCheckbox} />
            <label htmlFor='feedbackRequestCheckbox' className={styles.checkmarkContact}>Мне потребуется обратная связь по обращению</label>
          </div>
          <div>
            <input type='checkbox' id='feedbackDataProcessingCheckbox' className={styles.checkboxInput} required />
            <span class={styles.customCheckbox} />
            <label htmlFor='feedbackDataProcessingCheckbox' className={styles.checkmarkContact}>Я принимаю cогласие на обработку персональных данных, пользовательское соглашение, политику конфиденциальности и условия Клубной программы</label>
          </div>
        </div>
      </section>
    )
  }
}

class FeedbackSendButton extends React.Component {
  render() {
    return (
      <button id='send-request' className={styles.sendButton}>Отправить</button>
    )
  }
}

class FeedbackForm extends React.Component {
  formTitle = 'Обратная связь';
  formSubtitle = 'Напишите нам, если у вас возникли вопросы по сайту или вы хотите выразить благодарность.';

  render() {
    return (
      <form className={styles.feedbackForm}>
        <header className={styles.feedbackHeader}>
          <h1 className={styles.feedbackFormTitle}>{this.formTitle}</h1>
          <h3 className={styles.feedbackFormSubtitle}>{this.formSubtitle}</h3>
        </header>
        <main className={styles.feedbackMain}>
          <section className={styles.flexSection}>
            <FeedbackRequestSection />
            <FeedbackPersonalSection />
          </section>
          <FeedbackSendButton />
        </main>
      </form>
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
        <div className={styles.inProcess}>
          <h1>Страница Контакты</h1>
          <p>В разработке...</p>
        </div>
        <FeedbackForm />
      </main>
    )
  }
}

export default Contact;