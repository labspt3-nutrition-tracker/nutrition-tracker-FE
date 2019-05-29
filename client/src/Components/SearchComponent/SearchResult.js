import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 200px;
  height: 30px;
  background: #000;
  color: #FFF;
  display: block;

`;
class SearchResult extends React.Component{
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
    // console.log(this.state.isHidden)
    const searchResults = this.props.searchResults.slice(0,7)
    return(
      <div className="searchBox">
        {searchResults
          ? Object.keys(searchResults).map(function(key) {
              return (
                <div key={searchResults[key]}>
                  <p> {searchResults[key].food.label}</p>
                </div>
              );
            })
          : "No Lunch have been added"}
          <Button onClick={this.toggleHidden.bind(this)}> close </Button>
      </div>
    )
  }
}

export default SearchResult;
