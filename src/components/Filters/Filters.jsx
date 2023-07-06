import css from './Filters.module.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export const Filters = ({ handleFiltering, handleFilteringByDOB }) => {
  const options = {
    enableTime: true,
    time_24hr: true,
    dateFormat: 'd.m.Y',
    mode: 'range',
    // altInput: true,

    onClose(selectedDates) {
      if (selectedDates.length === 0) {
        return;
      }
      handleFilteringByDOB(selectedDates);
    },
  };
  flatpickr('#date', options);
  return (
    <div>
      <div className={css.filtersContainer}>
        <div>
          <label>
            id
            <input
              onChange={handleFiltering}
              className={css.input}
              type="number"
              name="id"
            />
          </label>
          <label>
            Imię
            <input
              onChange={handleFiltering}
              className={css.input}
              type="text"
              name="firstName"
            />
          </label>
          <label>
            Nazwisko
            <input
              onChange={handleFiltering}
              className={css.input}
              type="text"
              name="lastName"
            />
          </label>
        </div>
        <div>
          <label>
            Data urodzenia
            <input
              // type="text"
              name="dateOfBirth"
              placeholder="Wybierz zakres dat"
              id="date"
              className={css.input}
              autoComplete="off"
            />
          </label>
          <label>
            Funkcja
            <input
              onChange={handleFiltering}
              className={css.input}
              type="text"
              name="function"
            />
          </label>
          <label>
            Doświadczenie
            <input
              onChange={handleFiltering}
              className={css.input}
              type="number"
              name="experience"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
export const ClearButton = ({ onClick }) => {
  return (
    <button className={css.button} onClick={onClick}>
      Wyczyść filtry
    </button>
  );
};

export const ShowFilters = ({ onClick }) => {
  return (
    <button className={css.button} onClick={onClick}>
      Pokaż filtry
    </button>
  );
};
export const HideFilters = ({ onClick }) => {
  return (
    <button className={css.button} onClick={onClick}>
      Schowaj filtry
    </button>
  );
};
