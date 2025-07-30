const FEEDBACK_KEY = 'feedback';

// валидация
export const validateFeedbackData = (formData) => {
  const errors = [];
  
  if (!formData.type) {
    errors.push('Выберите тип обращения');
  }
  
  if (!formData.message) {
    errors.push('Введите текст обращения');
  }
  
  if (!formData.fullName) {
    errors.push('Введите Фамилию и Имя');
  }
  
  if (!formData.phoneNum) {
    errors.push('Введите номер телефона');
  }
  
  if (!formData.email) {
    errors.push('Введите email');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    errors.push('Введите корректный email');
  }
  
  const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
  if (formData.phoneNum && !phoneRegex.test(formData.phoneNum)) {
    errors.push('Введите корректный номер телефона');
  }
  
  if (!formData.dataProcessing) {
    errors.push('Необходимо согласие на обработку персональных данных');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const prepareFeedbackData = (formData) => {
  return {
    ...formData,
    timestamp: new Date().toISOString(),
    id: 'FeedBack-' + Date.now()
  };
};

export const saveFeedbackToStorage = (feedbackData) => {
  try {
    const existingFeedback = getFeedbackFromStorage();
    
    const updatedFeedback = [...existingFeedback, feedbackData];
    
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updatedFeedback));
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении обращения:', error);
    return false;
  }
};

export const getFeedbackFromStorage = () => {
  try {
    const feedback = localStorage.getItem(FEEDBACK_KEY);
    return feedback ? JSON.parse(feedback) : [];
  } catch (error) {
    console.error('Ошибка при получении обращений:', error);
    return [];
  }
};

export const getFeedbackTypes = () => [
  { value: 'gratitude', label: 'Благодарность' },
  { value: 'complaint', label: 'Жалоба' },
  { value: 'suggestion', label: 'Совет' }
];

export const formatFeedbackForDisplay = (feedbackData) => {
  const typeLabels = {
    'gratitude': 'Благодарность',
    'complaint': 'Жалоба',
    'suggestion': 'Совет'
  };
  
  return {
    ...feedbackData,
    typeLabel: typeLabels[feedbackData.type] || feedbackData.type,
    date: new Date(feedbackData.timestamp).toLocaleDateString('ru-RU')
  };
};

// заглушка для будущего бэка
export const submitFeedback = async (feedbackData) => {
  console.log('Отправка обращения:', feedbackData);
  
  // вместо этой поеботы ↓ будет fetch к бэку
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        feedbackId: feedbackData.id,
        message: 'Обращение успешно отправлено!'
      });
    }, 1000);
  });
};