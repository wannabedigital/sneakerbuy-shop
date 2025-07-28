import React from 'react';

// Styles
import styles from '../styles/feedback.module.css';

class FeedbackRequestSection extends React.Component {
  render() {
    return (
      <section className={styles.feedbackRequest}>
        <h2 className={styles.feedbackSectionTitle}>Обращение</h2>
        <div id='feedbackTypeSelectDiv' className={styles.inputField}>
          <p><label htmlFor='feedbackTypeSelect'>Выберите тип обращения</label></p>
          <select
            id='feedbackTypeSelect'
            name='feedbackType'
            placeholder='Тип обращения'
            defaultValue=''
            onChange={this.props.onChange}
            required
          >
            <option value='' disabled>Тип обращения</option>
            <option value='gratitude'>Благодарность</option>
            <option value='complaint'>Жалоба</option>
            <option value='suggestion'>Совет</option>
          </select>
        </div>
        <div id='orderNumberInputDiv' className={styles.inputField}>
          <p><label htmlFor='orderNumberInput'>Введите номер заказа</label></p>
          <input
            type='text'
            id='orderNumberInput'
            name='orderNumber'
            placeholder='Номер заказа'
            onChange={this.props.onChange}
            required
          />
        </div>
        <div id='messageTextareaDiv' className={styles.inputField}>
          <p><label htmlFor='messageTextarea'>Ваше обращение</label></p>
          <textarea
            id='messageTextarea'
            name='message'
            className={styles.messageTextarea}
            placeholder='Обращение'
            onChange={this.props.onChange}
            required
          />
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
        <div id='fullNameInputDiv' className={styles.inputField}>
          <p><label htmlFor='fullNameInput'>Фамилия Имя</label></p>
          <input
            type='text'
            id='fullNameInput'
            name='fullName'
            placeholder='Фамилия Имя'
            onChange={this.props.onChange}
            required
          />
        </div>
        <div id='phoneNumInputDiv' className={styles.inputField}>
          <p><label htmlFor='phoneNumInput'>Номер телефона</label></p>
          <input
            type='tel'
            id='phoneNumInput'
            name='phoneNum'
            placeholder='Телефон'
            onChange={this.props.onChange}
            required
          />
        </div>
        <div id='emailInputDiv' className={styles.inputField}>
          <p><label htmlFor='emailInput'>Адрес электронной почты</label></p>
          <input
            type='email'
            id='emailInput'
            name='email'
            placeholder='E-mail'
            onChange={this.props.onChange}
            required
          />
        </div>
        <div id='agreementDiv' className={styles.inputField}>
          <div>
            <input
              type='checkbox'
              id='feedbackRequestCheckbox'
              name='feedbackRequest'
              className={styles.checkboxInput}
              onChange={this.props.onChange}
            />
            <span className={styles.customCheckbox} />
            <label htmlFor='feedbackRequestCheckbox' className={styles.checkmarkContact}>Мне потребуется обратная связь по обращению</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='feedbackDataProcessingCheckbox'
              name='dataProcessing'
              className={styles.checkboxInput}
              onChange={this.props.onChange}
              required
            />
            <span className={styles.customCheckbox} />
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
      <button type='submit' form='feedbackFormID' id='submitForm' className={styles.sendButton}>
        Отправить
      </button>
    )
  }
}

class FeedbackForm extends React.Component {
  formTitle = 'Обратная связь';
  formSubtitle = 'Напишите нам, если у вас возникли вопросы по сайту или вы хотите выразить благодарность.';
  state = {
    formData: {
      type: '',
      orderNumber: '',
      message: '',
      fullName: '',
      phoneNum: '',
      email: '',
      feedbackRequest: false,
      dataProcessing: false
    },
    submitted: false
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    console.log('Form Data:', formData);
    localStorage.setItem('feedback', JSON.stringify(formData));
    this.setState({ submitted: true });
  };

  handleReset = () => {
    this.setState({
      formData: {
        type: '',
        orderNumber: '',
        message: '',
        fullName: '',
        phoneNum: '',
        email: '',
        feedbackRequest: false,
        dataProcessing: false
      },
      submitted: false
    });
  };

  render() {
    const { submitted } = this.state;

    return (
      <form id='feedbackFormID' className={styles.feedbackForm} onSubmit={this.handleSubmit}>
        <header className={styles.feedbackHeader}>
          <h1 className={styles.feedbackFormTitle}>{this.formTitle}</h1>
          <h3 className={styles.feedbackFormSubtitle}>{this.formSubtitle}</h3>
        </header>
        <main className={styles.feedbackMain}>
          {submitted ? (
            <div className={styles.successContainer}>
              <p className={styles.successMessage}>Мы обязательно (не) прочитаем ваше обращение</p>
              <button
                type='button'
                className={styles.resetButton}
                onClick={this.handleReset}
              >
                Отправить ещё одно обращение
              </button>
            </div>
          ) : (
            <>
              <section className={styles.flexSection}>
                <FeedbackRequestSection onChange={this.handleChange} />
                <FeedbackPersonalSection onChange={this.handleChange} />
              </section>
              <FeedbackSendButton />
            </>
          )}
        </main>
      </form>
    )
  }
}

export default FeedbackForm;