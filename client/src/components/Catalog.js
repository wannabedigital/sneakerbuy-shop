import React from 'react';

// Styles
import styles from '../styles/catalog.module.css';

// Components
import Breadcrumbs from './Breadcrumbs';
import Filter from './Filter';
import Products from './ProductsList';
import UnderDevelope from './UnderDevelope';

class Catalog extends React.Component {
  state = {
    allProducts: [],
    filteredProducts: [],
    selectedSize: {},
    filters: {
      minPrice: 0,
      maxPrice: 100000,
      genders: [],
      categories: [],
      brands: [],
      sizes: []
    },
    maxPriceLimit: 100000,
  };

  componentDidMount() {
    fetch('/json/products.json')
      .then((response) => response.json())
      .then((data) => {
        const maxPriceLimit = Math.max(...data.map((product) => product.price));
        const uniqueCategories = [...new Set(data.map(product => product.category))].sort();
        const uniqueBrands = [...new Set(data.map(product => product.brand))].sort();
        const uniqueSizes = [...new Set(data.flatMap(product => product.sizes))].sort((a, b) => {
          const numA = Number(a);
          const numB = Number(b);
          return numA - numB;
        });

        this.setState({
          allProducts: data,
          filteredProducts: data,
          filters: { minPrice: 0, maxPrice: maxPriceLimit, genders: [], categories: [], brands:[], sizes: [] },
          maxPriceLimit,
          uniqueCategories,
          uniqueBrands,
          uniqueSizes
        });
      })
      .catch((error) => console.error('Ошибка загрузки товаров:', error));
  }

  handleFilterChange = (newFilters) => {
    this.setState((prevState) => {
      const filters = { ...prevState.filters, ...newFilters };
      const filteredProducts = prevState.allProducts.filter(
        (product) =>
          product.price >= filters.minPrice &&
          product.price <= filters.maxPrice &&
          (filters.genders.length === 0 || filters.genders.includes(product.gender)) &&
          (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
          (filters.brands.length === 0 ||filters.brands.includes(product.brand)) &&
          (filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size)))
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
    this.setState({
      filters: { minPrice: 0, maxPrice: this.state.maxPriceLimit, genders: [], categories: [], brands: [], sizes: [] },
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
        <div className={styles.containerFilterFlypages}>
          <Filter
            filters={filters}
            onFilterChange={this.handleFilterChange}
            maxPrice={this.state.maxPriceLimit}
            onReset={this.resetFilters}
            categories={this.state.uniqueCategories}
            brands={this.state.uniqueBrands}
            sizes={this.state.uniqueSizes}
          />
          <div className={styles.containerFlypagePagination}>
            <Products
              products={filteredProducts}
              selectedSize={selectedSize}
              onSizeChange={this.handleSizeChange}
              addToCart={this.addToCart}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Catalog;