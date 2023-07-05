import React from 'react';
import css from './EmployeeTable.module.css';
import { ReactComponent as SortUp } from '../../images/sort-up.svg';
import { ReactComponent as SortDown } from '../../images/sort-down.svg';
import { converMsToString } from '../../helperFunctions/helperFunctions';
export const Header = ({ columns, sortUp, sortDown }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column} className={css.employeeTableHeaderCell}>
            {column}
            <button className={css.sortButton} onClick={() => sortUp(column)}>
              <SortUp />
            </button>
            <button className={css.sortButton} onClick={() => sortDown(column)}>
              <SortDown />
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const TableContent = ({ data }) => {
  return (
    <tbody>
      {data.map(person => {
        return (
          <tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{converMsToString(person.dateOfBirth)}</td>
            <td>{person.function}</td>
            <td>{person.experience}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
export const EmployeeTable = ({ children }) => {
  return (
    <div>
      <table className={css.employeeTable}>{children}</table>
    </div>
  );
};
