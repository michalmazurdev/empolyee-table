import { useEffect, useState } from 'react';
import css from './App.module.css';
import {
  EmployeeTable,
  Header,
  TableContent,
} from './EmployeeTable/EmployeeTable';
import { Pagination } from './Pagination/Pagination';
import data from './słuzba.json';

const choosePage = (page, data) => {
  const multiplier = page - 1;
  return data.slice(0 + 5 * multiplier, 5 + 5 * multiplier);
};

export const App = () => {
  const [employees, setEmployees] = useState(data);
  const [page, setPage] = useState(1);
  const [employeesToRender, setEmployeesToRender] = useState(
    choosePage(page, employees)
  );

  useEffect(() => {
    setEmployees(data);
  }, []);
  useEffect(() => {
    console.log(page);
    // console.log(employeesToRender);

    setEmployeesToRender(choosePage(page, employees));
  }, [page, employees, setEmployeesToRender]);

  const changePage = event => {
    setPage(Number(event.target.innerText));
  };

  const columns = [
    'id',
    'Imię',
    'Nazwisko',
    'Data urodzenia',
    'Funkcja',
    'Doświadczenie',
  ];

  return (
    <div>
      <h1 className={css.heading}>Pracownicy posiadłości Pięknej i Bestii</h1>
      <EmployeeTable>
        <Header columns={columns} />
        <TableContent data={employeesToRender} />
      </EmployeeTable>
      <Pagination employees={employees} onClick={changePage} />
    </div>
  );
};
