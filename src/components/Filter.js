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
        minPrice: this.props.filters?.minPrice ?? 0,
        maxPrice: this.props.filters?.maxPrice ?? this.props.maxPrice ?? 100000,
      });
    }
  }

  handlePriceChange = (e) => {
    const { name, value } = e.target;
    const priceGap = 1;

    this.setState(
      (prevState) => {
        let minPrice = prevState.minPrice;
        let maxPrice = prevState.maxPrice;

        if (name === 'minPrice') {
          minPrice = Math.max(0, parseInt(value) || 0);
          if (minPrice > maxPrice - priceGap) {
            minPrice = maxPrice - priceGap;
          }
        } else {
          maxPrice = Math.min(this.props.maxPrice, parseInt(value) || maxPrice);
          if (maxPrice < minPrice + priceGap) {
            maxPrice = minPrice + priceGap;
          }
        }

        return { minPrice, maxPrice };
      },
      () => {
        this.props.onFilterChange?.(this.state);
      }
    );
  };

  handleRangeChange = (e) => {
    const { name, value } = e.target;
    const priceGap = 1;

    this.setState(
      (prevState) => {
        let minPrice = prevState.minPrice;
        let maxPrice = prevState.maxPrice;

        if (name === 'minPrice') {
          minPrice = parseInt(value);
          if (minPrice > maxPrice - priceGap) {
            minPrice = maxPrice - priceGap;
          }
        } else {
          maxPrice = parseInt(value);
          if (maxPrice < minPrice + priceGap) {
            maxPrice = minPrice + priceGap;
          }
        }

        return { minPrice, maxPrice };
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
                  type="number"
                  id="minNumInput"
                  name="minPrice"
                  className={styles.minInput}
                  value={minPrice}
                  onChange={this.handlePriceChange}
                  min="0"
                  max={maxPriceLimit}
                />
              </div>
              <div className={styles.priceInputField}>
                <input
                  type="number"
                  id="maxNumInput"
                  name="maxPrice"
                  className={styles.maxInput}
                  value={maxPrice}
                  onChange={this.handlePriceChange}
                  min="0"
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
            type="range"
            id="minRangeInput"
            name="minPrice"
            className={styles.minRange}
            min="0"
            max={maxPriceLimit}
            value={minPrice}
            onChange={this.handleRangeChange}
            step="1"
          />
          <input
            type="range"
            id="maxRangeInput"
            name="maxPrice"
            className={styles.maxRange}
            min="0"
            max={maxPriceLimit}
            value={maxPrice}
            onChange={this.handleRangeChange}
            step="1"
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
      const { filters, onFilterChange, maxPrice, onReset } = this.props;

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