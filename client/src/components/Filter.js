import React from 'react';

// Styles
import styles from '../styles/filter.module.css';

class PriceFilter extends React.Component {
  state = {
    minPrice: this.props.filters?.minPrice ?? 0,
    maxPrice: this.props.filters?.maxPrice ?? this.props.maxPrice ?? 100000,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.filters?.minPrice !== this.props.filters?.minPrice ||
      prevProps.filters?.maxPrice !== this.props.filters?.maxPrice ||
      prevProps.maxPrice !== this.props.maxPrice
    ) {
      this.setState({
        minPrice: Math.max(0, this.props.filters?.minPrice ?? 0),
        maxPrice: Math.min(this.props.maxPrice, Math.max(this.state.minPrice + 1, this.props.filters?.maxPrice ?? this.props.maxPrice ?? 100000)),
      });
    }
  }

  handlePriceChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value) || 0;
    const priceGap = 1;

    this.setState(
      ({ minPrice, maxPrice }) => {
        let newMinPrice = minPrice;
        let newMaxPrice = maxPrice;

        if (name === 'minPrice') {
          newMinPrice = Math.max(0, parsedValue);
          newMaxPrice = Math.max(newMaxPrice, newMinPrice + priceGap);
        } else {
          newMaxPrice = Math.max(minPrice + priceGap, Math.min(this.props.maxPrice, parsedValue));
        }

        return { minPrice: newMinPrice, maxPrice: newMaxPrice };
      },
      () => {
        this.props.onFilterChange?.(this.state);
      }
    );
  };

  handleRangeChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value) || 0;
    const priceGap = 1;

    this.setState(
      ({ minPrice, maxPrice }) => {
        let newMinPrice = minPrice;
        let newMaxPrice = maxPrice;

        if (name === 'minPrice') {
          newMinPrice = Math.max(0, parsedValue);
          newMaxPrice = Math.max(newMaxPrice, newMinPrice + priceGap);
        } else {
          newMaxPrice = Math.max(minPrice + priceGap, Math.min(this.props.maxPrice, parsedValue));
        }

        return { minPrice: newMinPrice, maxPrice: newMaxPrice };
      },
      () => {
        this.props.onFilterChange?.(this.state);
      }
    );
  };

  render() {
    const { minPrice, maxPrice } = this.state;
    const { maxPrice: maxPriceLimit } = this.props;

    return (
      <div className={styles.filterContainer}>
        <h3 className={styles.filterSubtitle}>Цена</h3>
        <div className={styles.priceInputContainer}>
          <div className={styles.priceInput}>
            <div className={styles.priceFromTo}>
              <span>От</span>
              <span>До</span>
            </div>
            <div className={styles.priceInputFields}>
              <div className={styles.priceInputField}>
                <input
                  type='number'
                  id='minNumInput'
                  name='minPrice'
                  className={styles.minInput}
                  value={minPrice}
                  onChange={this.handlePriceChange}
                  min='0'
                  max={maxPriceLimit - 1}
                />
              </div>
              <div className={styles.priceInputField}>
                <input
                  type='number'
                  id='maxNumInput'
                  name='maxPrice'
                  className={styles.maxInput}
                  value={maxPrice}
                  onChange={this.handlePriceChange}
                  min={minPrice + 1}
                  max={maxPriceLimit}
                />
              </div>
            </div>
          </div>
          <div className={styles.sliderContainer}>
            <div
              className={styles.priceSlider}
              style={{
                left: `${(minPrice / maxPriceLimit) * 100}%`,
                right: `${100 - (maxPrice / maxPriceLimit) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className={styles.rangeInput}>
          <input
            type='range'
            id='minRangeInput'
            name='minPrice'
            className={styles.minRange}
            min='0'
            max={maxPriceLimit - 1}
            value={minPrice}
            onChange={this.handleRangeChange}
            step='1'
          />
          <input
            type='range'
            id='maxRangeInput'
            name='maxPrice'
            className={styles.maxRange}
            min='0'
            max={maxPriceLimit}
            value={maxPrice}
            onChange={this.handleRangeChange}
            step='1'
          />
        </div>
      </div>
    );
  }
}

class GenderFilter extends React.Component {
  state = {
    genders: this.props.filters?.genders ?? [],
  };
  
  componentDidUpdate(prevProps) {
    if (prevProps.filters?.genders !== this.props.filters?.genders) {
      this.setState({
        genders: this.props.filters?.genders ?? [],
      });
    }
  }

  handleGenderChange = (e) => {
    const { value, checked } = e.target;
    this.setState(
      (prevState) => {
        let newGenders = [...prevState.genders];
        if (checked) {
          newGenders = [...newGenders, value];
        } else {
          newGenders = newGenders.filter((gender) => gender !== value);
        }
        return { genders: newGenders };
      },
      () => {
        this.props.onFilterChange?.(this.state);
      }
    );
  };
  
  render() {
    const { genders } = this.state;

    return (
      <div className={styles.filterContainer}>
        <h3 className={styles.filterSubtitle}>Пол</h3>
        <div className={styles.checkboxGroup} >
          <label className={styles.checkboxLabel}>
            <input
              type='checkbox'
              name='gender'
              value='man'
              checked={genders.includes('man')}
              onChange={this.handleGenderChange}
            />
            <span className={styles.checkmark} />
            Мужской
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type='checkbox'
              name='gender'
              value='woman'
              checked={genders.includes('woman')}
              onChange={this.handleGenderChange}
            />
            <span className={styles.checkmark} />
            Женский
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type='checkbox'
              name='gender'
              value='unisex'
              checked={genders.includes('unisex')}
              onChange={this.handleGenderChange}
            />
            <span className={styles.checkmark} />
            Унисекс
          </label>
        </div>
      </div>
    )
  }
}

class CategoryFilter extends React.Component {
  state = {
    categories: this.props.filters?.categories ?? [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.filters?.categories !== this.props.filters?.categories) {
      this.setState({
        categories: this.props.filters?.categories ?? [],
      });
    }
  }

  handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    this.setState(
      (prevState) => {
        let newCategories = [...prevState.categories];
        if (checked) {
          newCategories = [...newCategories, value];
        } else {
          newCategories = newCategories.filter((category) => category !== value);
        }
        return { categories: newCategories };
      },
      () => {
        this.props.onFilterChange?.(this.state);
      }
    );
  };
  
  render() {
    const { categories } = this.state;
    const availableCategories = this.props.availableCategories || [];

    return (
      <div className={styles.filterContainer}>
        <h3 className={styles.filterSubtitle}>Категории</h3>
        <div className={styles.checkboxGroup} >
          {availableCategories.map((category) => (
            <label key={category} className={styles.checkboxLabel}>
              <input
                type='checkbox'
                name='category'
                value={category}
                checked={categories.includes(category)}
                onChange={this.handleCategoryChange}
              />
              <span className={styles.checkmark} />
              {category}
            </label>
          ))}
        </div>
      </div>
    )
  }
}

class BrandFilter extends React.Component {
  state = {
    brands: this.props.filters?.brands ?? [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.filters?.brands !== this.props.filters?.brands) {
      this.setState({
        brands: this.props.filters?.brands ?? [],
      });
    }
  }

  handleBrandChange = (e) => {
    const { value, checked } = e.target;
    this.setState(
      (prevState) => {
        let newBrands = [...prevState.brands];
        if (checked) {
          newBrands = [...newBrands, value];
        } else {
          newBrands = newBrands.filter((brand) => brand !== value);
        }
        return { brands: newBrands };
      },
      () => {
        this.props.onFilterChange?.(this.state);
      }
    );
  };
  
  render() {
    const { brands } = this.state;
    const availableBrands = this.props.availableBrands || [];

    return (
      <div className={styles.filterContainer}>
        <h3 className={styles.filterSubtitle}>Бренд</h3>
        <div className={styles.checkboxGroup} >
          {availableBrands.map((brand) => (
            <label key={brand} className={styles.checkboxLabel}>
              <input
                type='checkbox'
                name='brand'
                value={brand}
                checked={brands.includes(brand)}
                onChange={this.handleBrandChange}
              />
              <span className={styles.checkmark} />
              {brand}
            </label>
          ))}
        </div>
      </div>
    )
  }
}

class SizeFilter extends React.Component {
  state = {
    sizes: this.props.filters?.sizes ?? [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.filters?.sizes !== this.props.filters?.sizes) {
      this.setState({
        sizes: this.props.filters?.sizes ?? [],
      });
    }
  }

  handleSizeChange = (e) => {
    const { value, checked } = e.target;
    this.setState(
      (prevState) => {
        let newSizes = [...prevState.sizes];
        if (checked) {
          newSizes = [...newSizes, value];
        } else {
          newSizes = newSizes.filter((size) => size !== value);
        }
        return { sizes: newSizes };
      },
      () => {
        this.props.onFilterChange?.(this.state);
      }
    );
  };
  
  render() {
    const { sizes } = this.state;
    const availableSizes = this.props.availableSizes || [];

    return (
      <div className={styles.filterContainer}>
        <h3 className={styles.filterSubtitle}>Размер</h3>
        <div className={styles.checkboxGroup} >
          {availableSizes.map((size) => (
            <label key={size} className={styles.checkboxLabel}>
              <input
                type='checkbox'
                name='size'
                value={size}
                checked={sizes.includes(size)}
                onChange={this.handleSizeChange}
              />
              <span className={styles.checkmark} />
              {size}
            </label>
          ))}
        </div>
      </div>
    )
  }
}

class Filter extends React.Component {
    render() {
      const {
        filters = { minPrice: 0, maxPrice: 100000, genders: [], categories: [], brands: [], sizes: [] },
        onFilterChange = () => {},
        maxPrice = 100000,
        onReset = () => {},
        categories = [],
        brands = [],
        sizes = []
      } = this.props;

      return (
        <section className={styles.mainFilter}>
          <h1 className={styles.filterTitle}>Фильтр</h1>
          <PriceFilter filters={filters} onFilterChange={onFilterChange} maxPrice={maxPrice} />
          <GenderFilter filters={filters} onFilterChange={onFilterChange} />
          <CategoryFilter filters={filters} onFilterChange={onFilterChange} availableCategories={categories} />
          <BrandFilter filters={filters} onFilterChange={onFilterChange} availableBrands={brands} />
          <SizeFilter filters={filters} onFilterChange={onFilterChange} availableSizes={sizes} />
          <button className={styles.resetButton} onClick={onReset}>
            Сбросить фильтры
          </button>
        </section>
      )
    }
}

export default Filter;