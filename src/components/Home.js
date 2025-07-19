import React from 'react';
import { NavLink } from 'react-router-dom';

// Components
import Image from './Image';

// Styles
import styles from '../styles/home.module.css';

// Images
import offerImg from '../img/website_img/landing_page_img.png';
import tnfBrandLogo from '../img/website_img/brand/бренд 1.png';
import nikeBrandLogo from '../img/website_img/brand/бренд 2.png';
import adidasBrandLogo from '../img/website_img/brand/бренд 3.png';
import rickOwensBrandLogo from '../img/website_img/brand/rickowens.webp';
import reebokBrandLogo from '../img/website_img/brand/бренд 5.png';
import nbBrandLogo from '../img/website_img/brand/бренд 6.png';
import trainersCategoryImg from '../img/website_img/category/category 1.png';
import sneakersCategoryImg from '../img/website_img/category/category 3.png';
import bootsCategoryImg from '../img/website_img/category/category 2.png';
import lowShoesCategoryImg from '../img/website_img/category/category 4.png';
import highBootsCategoryImg from '../img/website_img/category/category 5.png';
import slippersCategoryImg from '../img/website_img/category/category 6.png';
import FirstSalesImg from '../img/website_img/sales/sale 1.png';
import SecondSalesImg from '../img/website_img/sales/sale 2.png';

class HomeOffer extends React.Component {
  offerTitleText = 'Твоя новая пара хайповой обуви с доставкой на дом';
  offerSubtitleText = 'Онлайн-магазин брендовой обуви - удобное решение, когда лень выходить из дома';

  render() {
    return (
      <section className={styles.mainOffer}>
        <div className={styles.offerContent}>
          <h1 className={styles.offerTitle}>{this.offerTitleText}</h1>
          <p className={styles.offerSubtitle}>{this.offerSubtitleText}</p>
          <div className={styles.divider}></div>
          <NavLink to='/catalog' className={styles.buttonLink}>
            <button className={styles.offerButton}>Посмотреть каталог</button>
          </NavLink>
        </div>
        <Image image={offerImg} alt='offer construction image'/>
      </section>
    );
  }
}

class HomeBrands extends React.Component {
  render() {
    return (
      <section className={styles.mainBrands}>
        <div className={styles.brandsHeader}>
          <h1 className={styles.brandsTitle}>Популярные бренды</h1>
          <NavLink to='/catalog' className={styles.buttonLink}>
            <button id='brandsButton' className={styles.checkAllButton}>Все</button>
          </NavLink>
        </div>

        <div className={styles.brandsCards}>
          <NavLink to='/catalog' className={styles.brand}>
            <Image image={tnfBrandLogo} alt='brand logo' />
          </NavLink>
          <NavLink to='/catalog' className={styles.brand}>
            <Image image={nikeBrandLogo} alt='brand logo' />
          </NavLink>
          <NavLink to='/catalog' className={styles.brand}>
            <Image image={adidasBrandLogo} alt='brand logo' />
          </NavLink>
          <NavLink to='/catalog' className={styles.brand}>
            <Image image={rickOwensBrandLogo} alt='brand logo' />
          </NavLink>
          <NavLink to='/catalog' className={styles.brand}>
            <Image image={reebokBrandLogo} alt='brand logo' />
          </NavLink>
          <NavLink to='/catalog' className={styles.brand}>
            <Image image={nbBrandLogo} alt='brand logo' />
          </NavLink>
        </div>
      </section>
    );

  }
}

class HomeCategories extends React.Component {
  render() {
    return (
      <section className={styles.mainCategories}>
        <div className={styles.categoriesHeader}>
          <h1 className={styles.categoriesTitle}>Популярные бренды</h1>
          <NavLink to='/catalog' className={styles.buttonLink}>
            <button id='categoriesButton' className={styles.checkAllButton}>Все</button>
          </NavLink>
        </div>

        <div className={styles.categoriesCards}>
          <NavLink to='/catalog' className={styles.category}>
            <span>Кроссовки</span>
            <Image image={trainersCategoryImg} alt='category image' />
          </NavLink>
          <NavLink to='/catalog' className={styles.category}>
            <span>Кеды</span>
            <Image image={sneakersCategoryImg} alt='category image' />
          </NavLink>
          <NavLink to='/catalog' className={styles.category}>
            <span>Ботинки</span>
            <Image image={bootsCategoryImg} alt='category image' />
          </NavLink>
          <NavLink to='/catalog' className={styles.category}>
            <span>Полуботинки</span>
            <Image image={lowShoesCategoryImg} alt='category image' />
          </NavLink>
          <NavLink to='/catalog' className={styles.category}>
            <span>Сапоги</span>
            <Image image={highBootsCategoryImg} alt='category image' />
          </NavLink>
          <NavLink to='/catalog' className={styles.category}>
            <span>Шлепанцы</span>
            <Image image={slippersCategoryImg} alt='category image' />
          </NavLink>
        </div>
      </section>
    );
  }
}

class HomeSales extends React.Component {
  render() {
    return(
      <section className={styles.mainSales}>
        <div className={styles.salesHeader}>
          <h1 className={styles.salesTitle}>Акции</h1>
        </div>
        <div className={styles.salesCards}>
					<NavLink to='/' className={styles.sale}>
						<span>Скидка 15% на обувь для баскетбола</span>
						<Image image={FirstSalesImg} alt='sale image' />
					</NavLink>
					<NavLink to='/' className={styles.sale}>
						<span>Акция 1 + 1 = 3 на носки</span>
						<Image image={SecondSalesImg} alt='sale image' />
					</NavLink>
				</div>
      </section>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <main className={styles.main}>
        <HomeOffer />
        <HomeBrands />
        <HomeCategories />
        <HomeSales />
      </main>
    );
  }
}

export default Home;