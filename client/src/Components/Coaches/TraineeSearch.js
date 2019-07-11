import React from 'react';
import styled from 'styled-components';

const Search = styled.div`
  height: 80px;
  width: 100%;
  text-align: center;
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

class TraineeSearch extends React.Component{

  render(){
    return(
      <Search>
          <SearchInput
          type="text"
          onChange={this.props.updateTraineeSearch}
          name="searchInput"
          value={this.props.traineeSearchInput}/>
        <SearchButton onClick={this.props.getUserData}>Search</SearchButton>
      </Search>
    )
  }
}

export default TraineeSearch;
