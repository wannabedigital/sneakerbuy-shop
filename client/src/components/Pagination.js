import React from 'react';

//Styles
import styles from '../styles/pagination.module.css';



class Pagination extends React.Component {



  render() {
    const { currentPage, totalPages, onPageChange, visiblePages = 5 } = this.props;

    return(
      <div className={styles.paginationContainer}>
        <p>Текущая страница: {currentPage}</p>
        <p>Всего страниц: {totalPages}</p>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Назад
        </button>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Вперёд
        </button>
      </div>
    );
  }
}

export default Pagination;