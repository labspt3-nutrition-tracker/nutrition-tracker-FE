import React from "react";
import styled from "styled-components";

const Search = styled.div`
  margin-bottom: 5px;
  margin-right: 3%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const SearchInput = styled.input`
  font-size: 1.5rem;
  height: 35px;
  width: 60%;
  margin-right: 10px;
  padding-left: 10px;
  border: none;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  color: #ffffff;
  background: #5e366a;
  border: 1px solid #5e366a;
  height: 35px;
  font-size: 1.6rem;
  min-width: 100px;
  width: 20%;
  font-weight: 500;
  &:hover {
    background: #ffffff;
    color: #5e366a;
  }
`;

class SearchInputComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Search>
        <SearchInput
          type="text"
          onChange={this.props.updateSearch}
          name="searchInput"
          value={this.props.searchInput}
          placeholder="Search for a food..."
        />
        <SearchButton onClick={this.props.getFoodData}>Search</SearchButton>
      </Search>
    );
  }
}

export default SearchInputComponent;
