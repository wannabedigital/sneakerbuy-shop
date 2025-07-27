import React from 'react';

//Styles
import styles from '../styles/pagination.module.css';

class Pagination extends React.Component {



  render() {
    const { currentPage, totalPages, onPageChange, visiblePages = 5 } = this.props;

    return(
      null
    );
  }
}

export default Pagination;