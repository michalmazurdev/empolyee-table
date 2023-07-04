// const { useState } = require('react');
// import data from './słuzba.json';
import React from 'react';
import css from './EmployeeTable.module.css';
// console.log(data);

export const Header = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column} className={css.employeeTableHeaderCell}>
            {column}
            <button>
              <img
                height="14"
                width="14"
                src="/Users/michalmazur/Documents/coding/employee-table/src/components/EmployeeTable/sortUp.svg"
                alt="sort up"
              />
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
            <td>{person.dateOfBirth}</td>
            <td>{person.function}</td>
            <td>{person.experience}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
export const EmployeeTable = ({ children }) => {
  // const [empoyees, setEmployees] = useState([]);

  return (
    <div>
      <table className={css.employeeTable}>{children}</table>
    </div>
  );
};
