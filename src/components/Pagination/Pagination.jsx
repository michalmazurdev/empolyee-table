import React from 'react';
import css from './Pagination.module.css';
export const Pagination = ({ employees, onClick, page }) => {
  const numberOfPages = Math.ceil(employees.length / 5);
  const buttons = [];
  for (let i = 1; i <= numberOfPages; i++) {
    buttons.push(
      <button className={css.paginationButton} key={i} onClick={onClick}>
        {i}
      </button>
    );
  }
  return (
    <div>
      <div className={css.paginationButtonsContainer}>{buttons}</div>
      <p className={css.currentPageInfo}>Current page: {page}</p>
    </div>
  );
};
