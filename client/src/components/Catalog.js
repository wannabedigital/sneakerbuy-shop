import React from 'react';

// Styles
import styles from '../styles/catalog.module.css';

// Components
import Breadcrumbs from './Breadcrumbs';
import Filter from './Filter';
import Products from './ProductsList';
import Pagination from './Pagination';

// Services
import * as productService from '../services/productService';

class Catalog extends React.Component {
  state = {
    allProducts: [],
    displayedProducts: [],
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
    currentPage: 1,
    productsPerPage: 12, // хахахахха ебанат
    totalPages: 0,
    totalProducts: 0,
    uniqueCategories: [],
    uniqueBrands: [],
    uniqueSizes: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = async () => {
    this.setState({ loading: true, error: null });
    
    try {
      const initData = await productService.initializeProducts();
      
      this.setState({
        allProducts: initData.allProducts,
        uniqueCategories: initData.uniqueCategories,
        uniqueBrands: initData.uniqueBrands,
        uniqueSizes: initData.uniqueSizes,
        maxPriceLimit: initData.maxPriceLimit,
        filters: { 
          minPrice: 0, 
          maxPrice: initData.maxPriceLimit, 
          genders: [], 
          categories: [], 
          brands: [], 
          sizes: [] 
        },
        loading: false
      }, () => {
        this.loadFilteredProducts();
      });
    } catch (error) {
      console.error('Ошибка инициализации данных:', error);
      this.setState({ 
        loading: false, 
        error: 'Не удалось загрузить товары'
      });
    }
  };

  loadFilteredProducts = async () => {
    const { allProducts, filters, currentPage, productsPerPage } = this.state;
    
    try {
      const result = await productService.fetchProducts(
        allProducts,
        filters,
        currentPage,
        productsPerPage
      );
      
      this.setState({
        displayedProducts: result.products,
        totalPages: result.totalPages,
        totalProducts: result.totalProducts
      });
    } catch (error) {
      console.error('Ошибка загрузки отфильтрованных товаров:', error);
    }
  };

  handleFilterChange = (newFilters) => {
    this.setState((prevState) => ({
      filters: { ...prevState.filters, ...newFilters },
      currentPage: 1
    }), () => {
      this.loadFilteredProducts();
    });
  };

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage }, () => {
      this.loadFilteredProducts();
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
      filters: { 
        minPrice: 0, 
        maxPrice: this.state.maxPriceLimit, 
        genders: [], 
        categories: [], 
        brands: [], 
        sizes: [] 
      },
      currentPage: 1
    }, () => {
      this.loadFilteredProducts();
    });
  };

  render() {
    const breadcrumbItems = [
      { name: 'Главная', path: '/' },
      { name: 'Каталог', path: '/catalog' },
    ];
    
    const { 
      displayedProducts, 
      selectedSize, 
      filters, 
      currentPage, 
      totalPages,
      loading,
      error,
      uniqueCategories,
      uniqueBrands,
      uniqueSizes,
      maxPriceLimit
    } = this.state;

    // Типо UX жосткий
    if (loading) return(
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
      </div>
    )
    if (error) return <div className={styles.main}>Ошибка: {error}</div>;

    return (
      <main className={styles.main}>
        <Breadcrumbs items={breadcrumbItems} />
        <div className={styles.containerFilterFlypages}>
          <Filter
            filters={filters}
            onFilterChange={this.handleFilterChange}
            maxPrice={maxPriceLimit}
            onReset={this.resetFilters}
            categories={uniqueCategories}
            brands={uniqueBrands}
            sizes={uniqueSizes}
          />
          <div className={styles.containerFlypagePagination}>
            <Products
              products={displayedProducts}
              selectedSize={selectedSize}
              onSizeChange={this.handleSizeChange}
              addToCart={this.addToCart}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Catalog;