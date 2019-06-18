import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 200px;
  height: 30px;
  background: #000;
  color: #FFF;
  display: block;

`;

const NoResult = styled.div`
  width: 200px;
  height: 30px;
`;
class SearchResults extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isHidden: true
    }
  }

  toggleHidden(){
    this.setState({
      isHidden: !this.state.isHidden
    })
  }


  render(){
    const searchResults = this.props.searchResults;
    const noResultError = this.props.noResultError;
    console.log(noResultError)
    return(
     <div>
     </div>
    )
  }
}

export default SearchResults;
