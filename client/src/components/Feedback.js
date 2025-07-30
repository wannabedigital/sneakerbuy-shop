import React from 'react';

// Styles
import styles from '../styles/feedback.module.css';

// Setvices
import * as feedbackService from '../services/feedbackService';

class FeedbackRequestSection extends React.Component {
  render() {
    const { formData } = this.props;
    return (
      <section className={styles.feedbackRequest}>
        <h2 className={styles.feedbackSectionTitle}>Обращение</h2>
        <div id='feedbackTypeSelectDiv' className={styles.inputField}>
          <p><label htmlFor='feedbackTypeSelect'>Выберите тип обращения</label></p>
          <select
            id='feedbackTypeSelect'
            name='type'
            value={formData.type}
            onChange={this.props.onChange}
          >
            <option value='' disabled>Тип обращения</option>
            {feedbackService.getFeedbackTypes().map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div id='orderNumberInputDiv' className={styles.inputField}>
          <p><label htmlFor='orderNumberInput'>Введите номер заказа</label></p>
          <input
            type='text'
            id='orderNumberInput'
            name='orderNumber'
            placeholder='Номер заказа'
            value={formData.orderNumber}
            onChange={this.props.onChange}
          />
        </div>
        <div id='messageTextareaDiv' className={styles.inputField}>
          <p><label htmlFor='messageTextarea'>Ваше обращение</label></p>
          <textarea
            id='messageTextarea'
            name='message'
            className={styles.messageTextarea}
            placeholder='Обращение'
            value={formData.message}
            onChange={this.props.onChange}
          />
        </div>
      </section>
    )
  }
}

class FeedbackPersonalSection extends React.Component {
  render() {
    const { formData } = this.props;
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
            value={formData.fullName}
            onChange={this.props.onChange}
          />
        </div>
        <div id='phoneNumInputDiv' className={styles.inputField}>
          <p><label htmlFor='phoneNumInput'>Номер телефона</label></p>
          <input
            type='tel'
            id='phoneNumInput'
            name='phoneNum'
            placeholder='Телефон'
            value={formData.phoneNum}
            onChange={this.props.onChange}
          />
        </div>
        <div id='emailInputDiv' className={styles.inputField}>
          <p><label htmlFor='emailInput'>Адрес электронной почты</label></p>
          <input
            type='email'
            id='emailInput'
            name='email'
            placeholder='E-mail'
            value={formData.email}
            onChange={this.props.onChange}
          />
        </div>
        <div id='agreementDiv' className={styles.inputField}>
          <div>
            <input
              type='checkbox'
              id='feedbackRequestCheckbox'
              name='feedbackRequest'
              className={styles.checkboxInput}
              value={formData.feedbackRequest}
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
              value={formData.dataProcessing}
              onChange={this.props.onChange}
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
    submitted: false,
    errors: []
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formData } = this.state;
    
    const validation = feedbackService.validateFeedbackData(formData);
    
    if (!validation.isValid) {
      this.setState({ errors: validation.errors });
      return;
    }
    
    this.setState({ errors: [] });
    
    try {
      const preparedData = feedbackService.prepareFeedbackData(formData);
      const result = await feedbackService.submitFeedback(preparedData);
      
      if (result.success) {
        feedbackService.saveFeedbackToStorage(preparedData);
        this.setState({ submitted: true });
      } else {
        this.setState({ 
          errors: ['Ошибка при отправке обращения. Пожалуйста, попробуйте еще раз.'] 
        });
      }
    } catch (error) {
      console.error('Ошибка при отправке обращения:', error);
      this.setState({ 
        errors: ['Ошибка при отправке обращения. Пожалуйста, попробуйте еще раз.'] 
      });
    }
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
      submitted: false,
      errors: []
    });
  };

  render() {
    const { submitted, errors } = this.state;
    console.log(errors);

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
              {errors.length > 0 ? (
                <>
                  <div className={styles.errorContainer}>
                    <h2>Ошибки</h2>
                    <ul>
                      {errors.map((error, index) => (
                        <li key={index} className={styles.errorMessage}>{error}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type='button'
                    className={styles.resetButton}
                    onClick={this.handleReset}
                  >
                    Попробовать ещё раз
                  </button>
                </>
              ) : (
                <>
                  <section className={styles.flexSection}>
                    <FeedbackRequestSection formData={this.state.formData} onChange={this.handleChange} />
                    <FeedbackPersonalSection formData={this.state.formData} onChange={this.handleChange} />
                  </section>
                  <FeedbackSendButton />
                </>
              )}
            </>
          )}
        </main>
      </form>
    )
  }
}

export default FeedbackForm;