import React from 'react';
import styled from 'styled-components';

const SearchBoxContainer = styled.div`

`;

const Search = styled.div`
  margin-left: 20px;
`;

const SearchInput = styled.input`
  margin: 10px 15px 0px;
  font-size: 1.5em;
`;

const SearchResultDiv = styled.div`
  margin: 15px;
  background: white;
  color: black;
`;


const SearchInputComponent = props => {
  return(
      <Search>
        <SearchBoxContainer>
          <SearchInput
          type="text"
          onChange={props.updateSearch}
          name="searchInput"
          value={props.searchInput}/>
          <button onClick={props.getFoodData}>Search</button>
          </SearchBoxContainer>
      </Search>
    )
}

export default SearchInputComponent;
