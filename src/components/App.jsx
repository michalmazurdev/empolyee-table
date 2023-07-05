import { useEffect, useState } from 'react';
import css from './App.module.css';
import {
  EmployeeTable,
  Header,
  TableContent,
} from './EmployeeTable/EmployeeTable';
import { Pagination } from './Pagination/Pagination';
import data from './słuzba.json';
// import { ReactComponent as SortUp } from './EmployeeTable/sort-up.svg';
// import { ReactComponent as SortDown } from './EmployeeTable/sort-down.svg';

const columns = [
  'id',
  'Imię',
  'Nazwisko',
  'Data urodzenia',
  'Funkcja',
  'Doświadczenie',
];
const accesors = Object.keys(data[0]);
console.log(data[0]);
console.log(accesors);

const choosePage = (page, data) => {
  const multiplier = page - 1;
  return data.slice(0 + 5 * multiplier, 5 + 5 * multiplier);
};

export const App = () => {
  const [employees, setEmployees] = useState([...data]);
  const [page, setPage] = useState(1);
  const [employeesToRender, setEmployeesToRender] = useState(
    choosePage(page, employees)
  );
  const [currentSort, setCurrentSort] = useState('');

  // useEffect(() => {
  //   // setEmployees(data);
  //   setEmployees(sortDescById(employees));
  // }, []);

  useEffect(() => {
    setEmployeesToRender(choosePage(page, employees));
    setPage(page);
  }, [page, employees, setEmployeesToRender, currentSort]);

  const sortDescById = column => {
    setCurrentSort(column);
    setEmployees(employees.sort((a, b) => b.id - a.id));
  };
  const sortAscById = column => {
    setCurrentSort(column);
    setEmployees(employees.sort((a, b) => a.id - b.id));
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
          sortUp={sortAscById}
          sortDown={sortDescById}
        />

        <TableContent data={employeesToRender} />
      </EmployeeTable>
      <Pagination employees={employees} onClick={changePage} page={page} />
    </div>
  );
};
