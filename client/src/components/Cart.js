import React from 'react';

// Styles
import styles from '../styles/cart.module.css';

// Components
import Image from './Image';

// Services
import * as cartService from '../services/cartService';

// Images
import cartIcon from '../img/svg_icons/cart_icon.svg';


class CartModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      phone: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCartSubmit = this.handleCartSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleCartSubmit(event) {
    event.preventDefault();
    const { name, email, address, phone } = this.state;
    const { cart, closeCart, clearCart, total } = this.props;
    const orderData = { name, email, address, phone };

    const validation = cartService.validateOrderData(orderData, cart);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const preparedOrder = cartService.prepareOrderData(orderData, cart, total);

    cartService.submitOrder(preparedOrder)
      .then(response => {
        if (response.success) {
          alert(`Заказ на сумму ${total} ₽ оформлен!\nНомер заказа: ${response.orderId}`);
          clearCart();
          closeCart();
          this.setState({ name: '', email: '', address: '', phone: '' });
        } else {
          alert('Ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
        }
      })
      .catch(error => {
        console.error('Ошибка при оформлении заказа:', error);
        alert('Ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
      });
  }

  render() {
    const { cart, total, removeFromCart, closeCart } = this.props;
    return (
      <div
        id='cart-modal'
        className={styles.cartModal}
        onClick={(e) => e.target.id === 'cart-modal' && closeCart()}
      >
        <div className={styles.cartContent}>
          <h2>Ваш заказ</h2>
          <div id='cart-items' className={styles.cartItems}>
            {cart.map((item) => (
              <div className={styles.cartItem} key={`${item.code}-${item.size}`}>
                <img
                  src={item.img}
                  alt={`${item.brand} ${item.model}`}
                />
                <span>
                  {item.brand} {item.model} (Размер: {item.size}) - {item.price} ₽ x {item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item.code, item.size)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <form id='cart-form' className={styles.cartForm} onSubmit={this.handleCartSubmit}>
            <input
              type='text'
              id='cart-name'
              name='name'
              placeholder='Имя'
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
            <input
              type='email'
              id='cart-email'
              name='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <input
              type='text'
              id='cart-address'
              name='address'
              placeholder='Адрес доставки'
              value={this.state.address}
              onChange={this.handleInputChange}
              required
            />
            <input
              type='tel'
              id='cart-phone'
              name='phone'
              placeholder='Телефон'
              value={this.state.phone}
              onChange={this.handleInputChange}
              required
            />
            <div className={styles.cartTotal}>
              Сумма: <span id='cart-total-amount'>{total}</span> ₽
            </div>
            <button type='submit' className={styles.cartSubmit}>
              Оплатить картой
            </button>
          </form>
          <button id='close-cart' className={styles.closeCart} onClick={closeCart}>
            Закрыть
          </button>
        </div>
      </div>
    );
  }
}

class HeaderCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: cartService.getCartFromStorage(),
      isCartOpen: false,
    };
    this.openCart = this.openCart.bind(this);
    this.closeCart = this.closeCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.closeCart();
    }
  }

  handleStorageChange() {
    this.setState({
      cart: cartService.getCartFromStorage()
    });
  }

  openCart() {
    this.setState({ isCartOpen: true });
  }

  closeCart() {
    this.setState({ isCartOpen: false });
  }

  removeFromCart(code, size) {
    const updatedCart = cartService.removeFromCart(this.state.cart, code, size);
    this.setState({ cart: updatedCart }, () => {
      cartService.saveCartToStorage(updatedCart);
    });
  }

  clearCart() {
    const clearedCart = cartService.clearCart();
    this.setState({ cart: clearedCart }, () => {
      cartService.saveCartToStorage(clearedCart);
    });
  }

  render() {
    const { cart, isCartOpen } = this.state;
    const total = cartService.calculateCartTotal(cart);

    return (
      <div className={styles.headerCart}>
        <div className={styles.cart} id='cart-icon' onClick={this.openCart}>
          <Image image={cartIcon} alt='cart' />
        </div>
        {isCartOpen && (
          <CartModal
            cart={cart}
            total={total}
            removeFromCart={this.removeFromCart}
            clearCart={this.clearCart}
            closeCart={this.closeCart}
          />
        )}
      </div>
    );
  }
}

export default HeaderCart;