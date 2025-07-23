import React from 'react';

// Styles
import styles from '../styles/contact.module.css';

// Components
import Image from './Image';
import Breadcrumbs from './Breadcrumbs';
import Filter from './Filter';
import UnderDevelope from './UnderDevelope';

class Products extends React.Component {
  handleAddToCart = (product) => {
    const { selectedSize, addToCart } = this.props;
    const size = selectedSize[product['product code']];
    if (!size) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    addToCart(product, size);
  };

  render() {
    const { products, selectedSize, onSizeChange } = this.props;

    return (
      <div className="products">
        {products.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            Ничего не найдено
          </p>
        ) : (
          products.map((product) => (
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
                className="sizeSelect"
                title="size"
                value={selectedSize[product['product code']] || ''}
                onChange={(e) =>
                  onSizeChange(product['product code'], e.target.value)
                }
              >
                <option value="">Выберите размер</option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <button onClick={() => this.handleAddToCart(product)}>
                Добавить в корзину
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
}

class Catalog extends React.Component {
  state = {
    allProducts: [],
    filteredProducts: [],
    selectedSize: {},
    filters: {
      minPrice: 0,
      maxPrice: 100000,
    },
  };

  componentDidMount() {
    fetch('/json/products.json')
      .then((response) => response.json())
      .then((data) => {
        const maxPrice = Math.max(...data.map((p) => p.price));
        this.setState({
          allProducts: data,
          filteredProducts: data,
          filters: { minPrice: 0, maxPrice },
        });
      })
      .catch((error) => console.error('Ошибка загрузки товаров:', error));
  }

  handleFilterChange = (newFilters) => {
    this.setState((prevState) => {
      const filters = { ...prevState.filters, ...newFilters };
      const filteredProducts = prevState.allProducts.filter(
        (product) =>
          product.price >= filters.minPrice && product.price <= filters.maxPrice
      );
      return { filters, filteredProducts };
    });
  };

  handleSizeChange = (productCode, size) => {
    this.setState((prevState) => ({
      selectedSize: { ...prevState.selectedSize, [productCode]: size },
    }));
  };

  addToCart = (product, size) => {
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
    window.dispatchEvent(new Event('storage'));
  };

  resetFilters = () => {
    const maxPrice = Math.max(...this.state.allProducts.map((p) => p.price));
    this.setState({
      filters: { minPrice: 0, maxPrice },
      filteredProducts: this.state.allProducts,
    });
  };

  render() {
    const { filteredProducts, selectedSize, filters } = this.state;
    const breadcrumbItems = [
      { name: 'Главная', path: '/' },
      { name: 'Каталог', path: '/catalog' },
    ];

    return (
      <main className={styles.main}>
        <Breadcrumbs items={breadcrumbItems} />
        <UnderDevelope />
        <div className="container-filter-flypages">
          <Filter
            filters={filters}
            onFilterChange={this.handleFilterChange}
            maxPrice={filters.maxPrice}
            onReset={this.resetFilters}
          />
          <Products
            products={filteredProducts}
            selectedSize={selectedSize}
            onSizeChange={this.handleSizeChange}
            addToCart={this.addToCart}
          />
        </div>
      </main>
    );
  }
}

export default Catalog;