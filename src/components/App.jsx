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
  Filters,
  ClearButton,
  ShowFilters,
  HideFilters,
} from './Filters/Filters';
import {
  convertDateToMs,
  choosePage,
} from '../helperFunctions/helperFunctions';
import data from '../data/słuzba.json';
import getTime from 'date-fns/getTime';

const dataWithDatesInMs = data.map(employee => {
  return {
    ...employee,
    id: Number(employee.id),
    dateOfBirth: convertDateToMs(employee.dateOfBirth),
  };
});
const columns = [
  'id',
  'Imię',
  'Nazwisko',
  'Data urodzenia',
  'Funkcja',
  'Doświadczenie',
];

export const App = () => {
  const [employees, setEmployees] = useState(dataWithDatesInMs);
  const [page, setPage] = useState(1);
  const [employeesToRender, setEmployeesToRender] = useState(
    choosePage(page, employees)
  );
  const [currentSort, setCurrentSort] = useState('');
  const [currentFilterCategory, setCurrentFilterCategory] = useState(null);
  const [currentFilterValue, setCurrentFilterValue] = useState(null);
  const [shouldFiltersBeShown, setShouldFiltersBeShown] = useState(false);
  useEffect(() => {
    setPage(page);
    if (currentFilterValue === null) {
      setEmployees(dataWithDatesInMs);
    }
    setEmployeesToRender(choosePage(page, employees));
  }, [
    page,
    employees,
    setEmployeesToRender,
    currentSort,
    currentFilterCategory,
    currentFilterValue,
    setEmployees,
    setCurrentFilterValue,
  ]);

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
  const handleFiltering = event => {
    setCurrentFilterCategory(event.target.name);
    setCurrentFilterValue(event.target.value);
    setPage(1);
    switch (event.target.name) {
      case 'firstName':
        setEmployees(
          employees.filter(employee =>
            employee['firstName']
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          )
        );
        break;
      case 'lastName':
        setEmployees(
          employees.filter(employee =>
            employee['lastName']
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          )
        );
        break;
      case 'function':
        setEmployees(
          employees.filter(employee =>
            employee['function']
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          )
        );
        break;
      case 'experience':
        setEmployees(
          dataWithDatesInMs.filter(
            employee =>
              Number(employee['experience']) === Number(event.target.value)
          )
        );
        break;
      case 'id':
        setEmployees(
          dataWithDatesInMs.filter(
            employee => Number(employee.id) === Number(event.target.value)
          )
        );
        break;
      default:
        console.log('error');
    }
    if (event.target.value === '') {
      setCurrentFilterCategory(null);
      setCurrentFilterValue(null);
    }
  };

  const handleFilteringByDOB = selectedDates => {
    setPage(1);
    setCurrentFilterCategory('dateOfBirth');
    setCurrentFilterValue(selectedDates);
    const startDate = getTime(selectedDates[0]);
    const endDate = getTime(selectedDates[1]);
    setEmployees(
      dataWithDatesInMs.filter(employee => {
        return (
          employee.dateOfBirth > startDate && employee.dateOfBirth < endDate
        );
      })
    );
  };
  const toggleFilters = () => {
    setShouldFiltersBeShown(!shouldFiltersBeShown);
  };
  const clearFilters = () => {
    setCurrentFilterCategory(null);
    setCurrentFilterValue(null);
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => (input.value = ''));
  };

  const changePage = event => {
    setPage(Number(event.target.innerText));
  };

  return (
    <div>
      <h1 className={css.heading}>Pracownicy posiadłości Pięknej i Bestii</h1>
      {shouldFiltersBeShown ? (
        <HideFilters onClick={toggleFilters} />
      ) : (
        <ShowFilters onClick={toggleFilters} />
      )}
      {shouldFiltersBeShown && (
        <Filters
          handleFiltering={handleFiltering}
          handleFilteringByDOB={handleFilteringByDOB}
        />
      )}
      {currentFilterValue !== null && <ClearButton onClick={clearFilters} />}{' '}
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
