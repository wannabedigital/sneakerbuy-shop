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
    const priceGap = 500;

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
    const priceGap = 500;

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
      <div className={styles.priceFilter}>
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
    render() {
        return (
            null
        )
    }
}

class Filter extends React.Component {
    render() {
      const { filters = { minPrice: 0, maxPrice: 100000 }, onFilterChange = () => {}, maxPrice = 100000, onReset = () => {} } = this.props;

      return (
        <section className={styles.mainFilter}>
          <h1 className={styles.filterTitle}>Фильтр</h1>
          <PriceFilter filters={filters} onFilterChange={onFilterChange} maxPrice={maxPrice} />
          <GenderFilter />
          <button className={styles.resetButton} onClick={onReset}>
            Сбросить фильтры
          </button>
        </section>
      )
    }
}

export default Filter;