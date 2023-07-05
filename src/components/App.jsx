import { useEffect, useState } from 'react';
import css from './App.module.css';
import {
  EmployeeTable,
  Header,
  TableContent,
} from './EmployeeTable/EmployeeTable';
import { Pagination } from './Pagination/Pagination';
import data from './słuzba.json';
import getTime from 'date-fns/getTime';

const columns = [
  'id',
  'Imię',
  'Nazwisko',
  'Data urodzenia',
  'Funkcja',
  'Doświadczenie',
];
const convertDateToMs = date => {
  const dotsReplaced = date.replaceAll('.', ' ');
  const semicolonReplaced = dotsReplaced.replace(':', ' ');
  const array = semicolonReplaced.split(' ');
  const year = Number(array[2]);
  const month = Number(array[1]) - 1;
  const day = Number(array[0]);
  const hour = Number(array[3]);
  const minutes = Number(array[4]);
  return getTime(new Date(year, month, day, hour, minutes));
};
export const converMsToString = timestamp => {
  return new Date(timestamp).toLocaleString('pl').slice(0, -3).replace(',', '');
};

const choosePage = (page, data) => {
  const multiplier = page - 1;
  return data.slice(0 + 5 * multiplier, 5 + 5 * multiplier);
};

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
    // setEmployees(data);
    // setEmployees(sortDescending(employees));
    // console.log(employees);
  }, []);

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
