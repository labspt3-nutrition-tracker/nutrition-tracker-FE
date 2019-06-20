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

class SearchInputComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }


  render(){
    return(
        <Search>
            <SearchInput
            type="text"
            onChange={this.props.updateSearch}
            name="searchInput"
            value={this.props.searchInput}/>
          <SearchButton onClick={this.props.getFoodData}>Search</SearchButton>
        </Search>
      )
  }

}

export default SearchInputComponent;
