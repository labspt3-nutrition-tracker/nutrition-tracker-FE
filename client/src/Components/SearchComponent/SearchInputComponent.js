import React from 'react';
import styled from 'styled-components';

const Search = styled.div`
  margin-bottom: 5px;
  margin-right: 3%;
`;

const SearchInput = styled.input`
  margin: 10px 15px 0px;
  font-size: 1.5em;
`;

const SearchButton = styled.button`
  color: #FCFCFB;
  background: #F4B4C3;
  margin-bottom: 5px;
  padding: 5px 15px;
  font-size: .9em;
`;

const SearchInputComponent = props => {
  return(
      <Search>
          <SearchInput
          type="text"
          onChange={props.updateSearch}
          name="searchInput"
          value={props.searchInput}/>
        <SearchButton onClick={props.getFoodData}>Search</SearchButton>
      </Search>
    )
}

export default SearchInputComponent;
