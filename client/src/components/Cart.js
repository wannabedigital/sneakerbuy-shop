import React from 'react';

// Styles
import styles from '../styles/cart.module.css';

// Components
import Image from './Image';

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
    const { cart, closeCart, clearCart } = this.props;

    if (name && email && address && phone && cart.length > 0) {
      alert(
        `Заказ на сумму ${this.props.total} ₽ оформлен!\nИмя: ${name}\nEmail: ${email}\nАдрес: ${address}\nТелефон: ${phone}`
      );
      clearCart();
      closeCart();
      this.setState({ name: '', email: '', address: '', phone: '' });
    } else {
      alert('Пожалуйста, заполните все поля и добавьте товары в корзину.');
    }
  }

  render() {
    const { cart, total, removeFromCart, closeCart } = this.props;
    return (
      <div
        id="cart-modal"
        className={styles.cartModal}
        onClick={(e) => e.target.id === 'cart-modal' && closeCart()}
      >
        <div className={styles.cartContent}>
          <h2>Ваш заказ</h2>
          <div id="cart-items" className={styles.cartItems}>
            {cart.map((item) => (
              <div className={styles.cartItem} key={`${item.code}-${item.size}`}>
                <img
                  src={item.img}
                  alt={`${item.brand} ${item.model}`}
                  style={{ width: '50px', height: '50px' }}
                />
                <span>
                  {item.brand} {item.model} (Размер: {item.size}) - {item.price} ₽
                  x {item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item.code, item.size)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <form id="cart-form" className={styles.cartForm} onSubmit={this.handleCartSubmit}>
            <input
              type="text"
              id="cart-name"
              name="name"
              placeholder="Имя"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
            <input
              type="email"
              id="cart-email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <input
              type="text"
              id="cart-address"
              name="address"
              placeholder="Адрес доставки"
              value={this.state.address}
              onChange={this.handleInputChange}
              required
            />
            <input
              type="tel"
              id="cart-phone"
              name="phone"
              placeholder="Телефон"
              value={this.state.phone}
              onChange={this.handleInputChange}
              required
            />
            <div className={styles.cartTotal}>
              Сумма: <span id="cart-total-amount">{total}</span> ₽
            </div>
            <button type="submit" className={styles.cartSubmit}>
              Оплатить картой
            </button>
          </form>
          <button id="close-cart" className={styles.closeCart} onClick={closeCart}>
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
      cart: JSON.parse(localStorage.getItem('cart')) || [],
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
      cart: JSON.parse(localStorage.getItem('cart')) || [],
    });
  }

  openCart() {
    this.setState({ isCartOpen: true });
  }

  closeCart() {
    this.setState({ isCartOpen: false });
  }

  removeFromCart(code, size) {
    const updatedCart = this.state.cart.filter(
      (item) => !(item.code === code && item.size === size)
    );
    this.setState({ cart: updatedCart }, () => {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    });
  }

  clearCart() {
    this.setState({ cart: [] }, () => {
      localStorage.setItem('cart', JSON.stringify([]));
    });
  }

  render() {
    const { cart, isCartOpen } = this.state;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <div className={styles.headerCart}>
        <div className={styles.cart} id="cart-icon" onClick={this.openCart}>
          <Image image={cartIcon} alt="cart" />
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