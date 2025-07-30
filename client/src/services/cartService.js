const CART_KEY = 'cart'; // ключ для корзины для локального хранилища

export const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Ошибка при получении корзины из localStorage:', error);
    return [];
  }
};

export const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Ошибка при сохранении корзины в localStorage:', error);
    return false;
  }
};

export const addToCart = (cart, product, size) => {
  const existingItem = cart.find(
    (item) => item.code === product['product code'] && item.size === size
  );

  if (existingItem) {
    return cart.map(item =>
      item.code === product['product code'] && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [
      ...cart,
      {
        code: product['product code'],
        brand: product.brand,
        model: product.model,
        price: product.price,
        size: size,
        quantity: 1,
        img: product.img,
      }
    ];
  }
};

export const removeFromCart = (cart, code, size) => {
  return cart.filter(item => !(item.code === code && item.size === size));
};

export const clearCart = () => {
  return [];
};

export const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// валидация
export const validateOrderData = (orderData, cart) => {
  const { name, email, address, phone } = orderData;
  
  if (!name || !email || !address || !phone) {
    return {
      isValid: false,
      error: 'Пожалуйста, заполните все поля'
    };
  }
  
  if (cart.length === 0) {
    return {
      isValid: false,
      error: 'Пожалуйста, добавьте товары в корзину'
    };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Пожалуйста, введите корректный email'
    };
  }
  
  const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return {
      isValid: false,
      error: 'Пожалуйста, введите корректный номер телефона'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
};

export const prepareOrderData = (orderData, cart, total) => {
  return {
    customer: {
      name: orderData.name,
      email: orderData.email,
      address: orderData.address,
      phone: orderData.phone
    },
    items: cart.map(item => ({
      code: item.code,
      brand: item.brand,
      model: item.model,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.price * item.quantity
    })),
    total: total,
    orderDate: new Date().toISOString()
  };
};

// заглушка для будущего бэка
export const submitOrder = async (orderData) => {
  console.log('Отправка заказа:', orderData);
  
  
  // вместо этой поеботы ↓ будет fetch к бэку
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: 'ORDER-' + Date.now(), // чат гпт придумал как можно заказы нумеровать
        message: 'Заказ успешно оформлен.'
      });
    }, 1000);
  });
};