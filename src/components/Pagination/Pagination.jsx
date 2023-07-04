import React from 'react';

export const Pagination = ({ employees, onClick }) => {
  const numberOfPages = Math.ceil(employees.length / 5);
  const buttons = [];
  for (let i = 1; i <= numberOfPages; i++) {
    buttons.push(
      <button key={i} onClick={onClick}>
        {i}
      </button>
    );
  }
  return <div>{buttons}</div>;
};
