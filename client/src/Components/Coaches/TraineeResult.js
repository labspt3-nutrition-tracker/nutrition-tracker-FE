import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TraineeSearchResult = styled.div`
  background: #3685b5;
  width: 50%;
  height: 100px;
  padding: 5px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SearchTitle = styled.h1`
  padding: 10px 0;
  font-size: 1.5em;
  color: #FCFCFB;
`;

const SearchResultDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SearchInfo = styled.div`
  color: #FCFCFB;
  & h1{
    font-size: 1.6em;
  }
  & p{
    font-size: 1.5em;
  }
`;

const RequestButton = styled.button`
  height: 40px;
  padding: 5px 30px;
  margin-right: 20px;
  font-size: 1.4em;
  background: #F4B4C3;
  color: #FCFCFB;
`;

const NoResultDiv = styled.div`
  padding: 20px 30px;
  font-size: 1.4em;
`;


const TraineeResult= props =>{
  return(
    <div>
      {props.traineeSearchResults === [] || props.traineeSearchResults === null && <TraineeSearchResult>
        <SearchTitle> Search Result: </SearchTitle>
        <NoResultDiv> No Results Found </NoResultDiv>
      </TraineeSearchResult> }
      {props.traineeSearchResults && props.traineeSearchResults.length !== 0 &&
        <TraineeSearchResult>
          <SearchTitle> Search Result: </SearchTitle>
          <SearchResultDiv>
            <SearchInfo>
              <h1> {props.traineeSearchResults.firstName} {props.traineeSearchResults.lastName} </h1>
              <h2> {props.traineeSearchResults.email}</h2>
            </SearchInfo>
              <RequestButton> Request to follow</RequestButton>
          </SearchResultDiv>
        </TraineeSearchResult>
      }
    </div>
  )
}

export default TraineeResult;
