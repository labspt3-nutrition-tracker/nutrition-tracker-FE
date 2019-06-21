import React from 'react';
import styled from 'styled-components';
import { SEARCH_USER_BY_EMAIL } from "../../graphql/queries";


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

class TraineeSearch extends React.Component{
  constructor(props){
    super(props)
  }

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
