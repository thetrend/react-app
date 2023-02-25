import cn from 'classnames';

import styles from './App.module.css';
import { SearchFormProps } from './App';
import InputWithLabel from './InputWithLabel';

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: SearchFormProps) => (
  <form onSubmit={onSearchSubmit} className={styles.searchForm}>
    <InputWithLabel
      id="search"
      label="Search"
      value={searchTerm}
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>
    <button
      type="submit"
      disabled={!searchTerm}
      className={cn(styles.button, styles.buttonLarge)}
    >
      Submit
    </button>
  </form>
);

export default SearchForm;