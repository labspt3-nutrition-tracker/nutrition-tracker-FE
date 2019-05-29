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
      <div className="searchBox">
        {(searchResults === [])
          ? <div> {this.props.noResultError}</div>
          : Object.keys(searchResults).map((obj, i) => {
              return (
                <div key={i}>
                  <p> {searchResults[obj].food.label}</p>
                </div>
              );
            })
         }
          <Button onClick={this.toggleHidden.bind(this)}> close </Button>
      </div>
    )
  }
}

export default SearchResults;
