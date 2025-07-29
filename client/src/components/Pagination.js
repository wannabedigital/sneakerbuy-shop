import React from 'react';

//Styles
import styles from '../styles/pagination.module.css';



class Pagination extends React.Component {
  render() {
    const { currentPage, totalPages, onPageChange, visiblePages = 5 } = this.props;

    let startPage, endPage;

    if (totalPages <= visiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfVisible = Math.floor(visiblePages / 2);
      
      if (currentPage <= halfVisible + 1) {
        startPage = 1;
        endPage = visiblePages;
      } else if (currentPage >= totalPages - halfVisible) {
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfVisible;
        endPage = currentPage + halfVisible;
      }
    }

    const pageNums = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNums.push(i);
    }

    return(
      <div className={styles.paginationContainer}>
        <button
          className={styles.pageArrow}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        <div className={styles.pages}>
          {pageNums.map((num) => (
            <button
              className={styles.page}
              key={num}
              onClick={() => onPageChange(num)}
              disabled = {num === currentPage}
            >
              {num}
            </button>
          ))}
        </div>
        <button
          className={styles.pageArrow}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    );
  }
}

export default Pagination;