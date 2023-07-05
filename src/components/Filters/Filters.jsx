import css from './Filters.module.css';

import 'flatpickr/dist/flatpickr.min.css';
const years = [];
for (let i = 1900; i < 2024; i++) {
  years.push(i);
}
// console.log(years);
export const Filters = ({ onChange }) => {
  // flatpickr('#date', {
  //   enableTime: false,
  //   minuteIncrement: 1440,
  //   onChange: onChange,
  // });
  // console.log(years);
  return (
    <div className={css.filtersContainer}>
      <div>
        <label>
          id
          <input onChange={onChange} type="number" name="id" />
        </label>
        <label>
          Imię
          <input onChange={onChange} type="text" name="firstName" />
        </label>
        <label>
          Nazwisko
          <input onChange={onChange} type="text" name="lastName" />
        </label>
      </div>
      <div>
        <label htmlFor="date">
          Data urodzenia
          <input
            onChange={onChange}
            type="text"
            name="dateOfBirth"
            placeholder="Wpisz rok urodzenia"
          />
          {years.forEach(year => (
            <option value={year}>{year}</option>
          ))}
        </label>

        <label>
          Funkcja
          <input onChange={onChange} type="text" name="function" />
        </label>
        <label>
          Doświadczenie
          <input onChange={onChange} type="number" name="experience" />
        </label>
      </div>
    </div>
  );
};
