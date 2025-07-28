import React from 'react';

//Styles
import styles from '../styles/productList.module.css';

// Components
import Image from './Image';

// Images
import sadIcon from '../img/svg_icons/sad_icon.svg';

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
      <div className={styles.products}>
        {products.length === 0 ? (
          <div className={styles.nothingFound}>
            <p>Ничего не найдено</p>
            <Image
              image={sadIcon}
              alt='sad emoji*'
            />
          </div>
        ) : (
          products.map((product) => (
            <div className={styles.product} key={product['product code']}>
              <Image
                image={product.img}
                alt={`${product.brand} ${product.model}`}
              />
              <div className={styles.productDescription}>
                <h3>{product.brand}</h3>
                <h4>{product.model}</h4>
                <p>{product.price} ₽</p>
                <select
                  className='sizeSelect'
                  title='size'
                  value={selectedSize[product['product code']] || ''}
                  onChange={(e) =>
                    onSizeChange(product['product code'], e.target.value)
                  }
                >
                  <option value='' disabled>Выберите размер</option>
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
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Products;