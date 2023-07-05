import React from 'react';
import { useEffect, useState } from 'react';
import css from './App.module.css';
import {
  EmployeeTable,
  Header,
  TableContent,
} from './EmployeeTable/EmployeeTable';
import { Pagination } from './Pagination/Pagination';
import {
  convertDateToMs,
  choosePage,
} from '../helperFunctions/helperFunctions';
import data from '../data/słuzba.json';
const columns = [
  'id',
  'Imię',
  'Nazwisko',
  'Data urodzenia',
  'Funkcja',
  'Doświadczenie',
];

export const App = () => {
  const [employees, setEmployees] = useState(
    data.map(employee => {
      return {
        ...employee,
        dateOfBirth: convertDateToMs(employee.dateOfBirth),
      };
    })
  );
  const [page, setPage] = useState(1);
  const [employeesToRender, setEmployeesToRender] = useState(
    choosePage(page, employees)
  );
  const [currentSort, setCurrentSort] = useState('');

  useEffect(() => {
    setEmployeesToRender(choosePage(page, employees));
    setPage(page);
  }, [page, employees, setEmployeesToRender, currentSort]);

  const sortDescending = column => {
    setCurrentSort(`${column}descending`);
    switch (column) {
      case 'id':
        setEmployees(employees.sort((a, b) => b.id - a.id));
        break;
      case 'Imię':
        setEmployees(
          employees.sort((a, b) => b.firstName.localeCompare(a.firstName))
        );
        break;
      case 'Nazwisko':
        setEmployees(
          employees.sort((a, b) => b.lastName.localeCompare(a.lastName))
        );
        break;
      case 'Data urodzenia':
        setEmployees(employees.sort((a, b) => b.dateOfBirth - a.dateOfBirth));
        break;
      case 'Funkcja':
        setEmployees(
          employees.sort((a, b) => b.function.localeCompare(a.function))
        );
        break;
      case 'Doświadczenie':
        setEmployees(employees.sort((a, b) => b.experience - a.experience));
        break;
      default:
        console.log('error');
    }
  };
  const sortAscending = column => {
    setCurrentSort(`${column}ascending`);
    switch (column) {
      case 'id':
        setEmployees(employees.sort((a, b) => a.id - b.id));
        break;
      case 'Imię':
        setEmployees(
          employees.sort((a, b) => a.firstName.localeCompare(b.firstName))
        );
        break;
      case 'Nazwisko':
        setEmployees(
          employees.sort((a, b) => a.lastName.localeCompare(b.lastName))
        );
        break;
      case 'Data urodzenia':
        setEmployees(employees.sort((a, b) => a.dateOfBirth - b.dateOfBirth));
        break;
      case 'Funkcja':
        setEmployees(
          employees.sort((a, b) => a.function.localeCompare(b.function))
        );
        break;
      case 'Doświadczenie':
        setEmployees(employees.sort((a, b) => a.experience - b.experience));
        break;
      default:
        console.log('error');
    }
  };
  const changePage = event => {
    setPage(Number(event.target.innerText));
  };

  return (
    <div>
      <h1 className={css.heading}>Pracownicy posiadłości Pięknej i Bestii</h1>
      <EmployeeTable>
        <Header
          columns={columns}
          sortUp={sortAscending}
          sortDown={sortDescending}
        />

        <TableContent data={employeesToRender} />
      </EmployeeTable>
      <Pagination employees={employees} onClick={changePage} page={page} />
    </div>
  );
};
