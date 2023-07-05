import css from './Filters.module.css';

export const Filters = ({ onChange }) => {
  return (
    <div>
      <p>opcje filtrowania</p>
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
    </div>
  );
};
