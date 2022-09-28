import PropTypes from 'prop-types';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  SearchbarContainer,
  SearchbarForm,
  SearchbarFormBtn,
  SearchbarFormBtnImg,
  SearchbarInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.currentTarget.value);
  };

  const handleSubmitSearchInfo = event => {
    event.preventDefault();
    if (search.trim() === '') {
      Notify.failure('Please enter the search field.');
      return;
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <SearchbarContainer>
      <SearchbarForm onSubmit={handleSubmitSearchInfo}>
        <SearchbarFormBtn type="submit">
          <SearchbarFormBtnImg>Search</SearchbarFormBtnImg>
        </SearchbarFormBtn>

        <SearchbarInput
          type="text"
          name="search"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchbarForm>
    </SearchbarContainer>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
