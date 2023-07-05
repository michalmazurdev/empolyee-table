import css from './Filters.module.css';

export const Filters = ({ onChange }) => {
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
        <label>
          Data urodzenia
          <input onChange={onChange} type="text" name="dateOfBirth" />
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
