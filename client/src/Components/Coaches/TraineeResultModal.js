import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ResultDiv = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 2px solid #2C363F;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`
const ResultTitle = styled.h1`
  color: #40A798;
  font-size: 1.4em;
  padding: 10px;
`

const ResultInfo = styled.div`
  padding: 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
const ResultInfoP = styled.p`
  font-size: 1.2em;
  color: #2C363F;
`
const ResultSpan = styled.span`
  color: #40A798;
`

const ModalButton = styled.button`
  padding: 5px 30px;
  margin-right: 20px;
  font-size: 1.4em;
  background: #F4B4C3;
  color: #FCFCFB;
  display: block;
  right: 0;
  position: fixed;
`;

const NoResultDiv = styled.div`
  padding: 20px 30px;
  font-size: 1.4em;
`;

const customStyles = {
  content : {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute"
  }
};

const TraineeResultModal = props =>{
  console.log(props.traineeSearchResults)
  return(
    <Modal
      style={customStyles}
      isOpen={props.isSearchModalOpen}>
      <ModalButton onClick={props.closeSearchModal}>close</ModalButton>
      {props.traineeSearchResults === [] || props.traineeSearchResults === null && <NoResultDiv> No Results Found </NoResultDiv> }
      {props.traineeSearchResults !== null &&

          <div onClick={() => { props.handleChooseUser(props.traineeSearchResults)}}>
          <h1> {props.traineeSearchResults.firstName} {props.traineeSearchResults.lastName} </h1>
          <h2> {props.traineeSearchResults.email}</h2>
          </div>

      }
    </Modal>
  )
}

export default TraineeResultModal;
