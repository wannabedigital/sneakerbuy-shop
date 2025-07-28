import React from 'react';

// Styles
import styles from '../styles/about.module.css';

// Components
import Image from './Image';
import Breadcrumbs from './Breadcrumbs';

// Images
import aboutImg from '../img/about_us/About_us.png';
import missionImg from '../img/about_us/Our_mission.png';

class ArticleAbout extends React.Component {
  title = 'О нас';
  content = [
    'SneakersBuy — это не просто магазин, это культура кроссовок. От классики баскетбольной площадки до уличного стиля, мы собрали для вас лучшие модели от топовых брендов.',
    'Наша миссия — дать каждому возможность выразить себя через обувь, будь то для спорта, повседневной жизни или коллекционирования. Мы работаем только с проверенными поставщиками, чтобы вы могли быть уверены в качестве.',
    'У нас вы найдете кроссовки, которые идеально подойдут под ваш стиль и образ жизни — от повседневных моделей до лимитированных стилей. SneakersBuy — для тех, кто живет в ритме уличной моды.'
  ];

  renderTextWithHighlightedBrand(text) {
    const parts = text.split('SneakersBuy');
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <span className={styles.highlightedBrand}>SneakersBuy</span>}
      </React.Fragment>
    ));
  }

  renderParagraphs(content) {
    return content.map((paragraph, index) => (
      <p key={index}>{this.renderTextWithHighlightedBrand(paragraph)}</p>
    ));
  }

  render() {
    return (
      <article className={styles.mainAbout}>
        <Image image={aboutImg} alt='about us image' />
        <div className={styles.aboutText}>
          <h2>{this.title}</h2>
          {this.renderParagraphs(this.content)}
        </div>
      </article>
    )
  }
}

class MissionAbout extends React.Component {
  title = 'Наша миссия';
  content = [
    'Создавать пространство, где обувь —   это больше, чем часть одежды. Это способ самовыражения, часть культуры и элемент стиля.',
    'Мы стремимся объединить уличную эстетику, спортивную энергию и модный взгляд в одном месте, чтобы каждый мог найти свою пару — ту самую, с которой начинается уверенность в себе.',
    'Наша цель — не просто продавать обувь, а формировать комьюнити, где ценят качество, стиль и свободу выбора.'
  ];

  renderParagraphs(content) {
    return content.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  }

  render() {
    return (
      <article className={styles.mainMission}>
        <div className={styles.missionText}>
          <h2>{this.title}</h2>
          {this.renderParagraphs(this.content)}
        </div>
        <Image image={missionImg} alt='our mission image' />
      </article>
    )
  }
}

class About extends React.Component {
  render() {
    const breadcrumbItems = [
      {name: 'Главная', path: '/'},
      {name: 'О сервисе', path: '/about'}
    ];

    return (
      <main className={styles.main}>
        <Breadcrumbs items={breadcrumbItems} />
        <ArticleAbout />
        <MissionAbout />
      </main>
    )
  }
}

export default About;