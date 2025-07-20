import React from 'react';

// Components
import Image from './Image';
import Breadcrumbs from './Breadcrumbs';

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedSize: {},
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    // Замени на загрузку из JSON или API
    const mockProducts = [
      {
        'product code': '001',
        brand: 'Nike',
        model: 'Air Max',
        price: 12000,
        img: '/img/product1.jpg',
        sizes: ['38', '39', '40', '41'],
      },
      {
        'product code': '002',
        brand: 'Adidas',
        model: 'Yeezy',
        price: 15000,
        img: '/img/product2.jpg',
        sizes: ['39', '40', '41', '42'],
      },
    ];
    this.setState({ products: mockProducts });
  }

  handleSizeChange(productCode, size) {
    this.setState((prevState) => ({
      selectedSize: { ...prevState.selectedSize, [productCode]: size },
    }));
  }

  addToCart(product) {
    const size = this.state.selectedSize[product['product code']];
    if (!size) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(
      (item) => item.code === product['product code'] && item.size === size
    );
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({
        code: product['product code'],
        brand: product.brand,
        model: product.model,
        price: product.price,
        size: size,
        quantity: 1,
        img: product.img,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage')); // Для синхронизации с HeaderCart
  }

  render() {
    const { products, selectedSize } = this.state;
    const breadcrumbItems = [
      {name: 'Главная', path: '/'},
      {name: 'Каталог', path: '/catalog'}
    ];

    return (
      <main className="catalog">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product['product code']}>
              <Image
                image={product.img}
                alt={`${product.brand} ${product.model}`}
              />
              <h3>
                {product.brand} {product.model}
              </h3>
              <p>{product.price} ₽</p>
              <select
                value={selectedSize[product['product code']] || ''}
                onChange={(e) =>
                  this.handleSizeChange(product['product code'], e.target.value)
                }
              >
                <option value="">Выберите размер</option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <button onClick={() => this.addToCart(product)}>
                Добавить в корзину
              </button>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default Catalog;