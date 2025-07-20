import React from 'react';

// Components
import Breadcrumbs from './Breadcrumbs';

class Contact extends React.Component {
  render() {
    const breadcrumbItems = [
      {name: 'Главная', path: '/'},
      {name: 'Контакты', path: '/contact'}
    ];

    return (
      <main className='contactPage'>
        <Breadcrumbs items={breadcrumbItems} />
        <h1>Страница "Контакты"</h1>
        <p>В разработке...</p>
      </main>
    )
  }
}

export default Contact;