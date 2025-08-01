import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import styles from '../styles/breadcrumbs.module.css'

class Breadcrumbs extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <nav className={styles.breadcrumbs}>
        {items.map((item, index) => (
        <React.Fragment key={index}>
          <NavLink
          to={item.path}
          className={({ isActive }) =>
            `${styles.breadcrumb} ${isActive ? styles.active : 'notActive'}`
          }
          >
          {item.name}
          </NavLink>
          {index < items.length - 1 && <span className={styles.separator}> &#47; </span>}
        </React.Fragment>
        ))}
      </nav>  
      )
    }
}

export default Breadcrumbs;