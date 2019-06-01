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
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    height                : '50%',
    width                 : '50%',
    transform             : 'translate(-50%, -50%)',
    position:               'absolute'
  }
};

Modal.setAppElement('#root')

const AppModal = props => {

  return (
    <Modal
      style={customStyles}
      isOpen={props.isOpen}>
        <ModalButton onClick={props.closeModal}>close</ModalButton>

      { props.searchResults && Object.keys(props.searchResults).map((obj, item) => {
        const edamam_name = props.searchResults[obj].food.label.charAt(0).toUpperCase() + props.searchResults[obj].food.label.slice(1).toLowerCase();
        const edamam_id = props.searchResults[obj].food.foodId;
        const calories = props.searchResults[obj].food.nutrients.ENERC_KCAL ? props.searchResults[obj].food.nutrients.ENERC_KCAL.toFixed(2) : 0;
        const carbs = props.searchResults[obj].food.nutrients.CHOCDF ? props.searchResults[obj].food.nutrients.CHOCDF.toFixed(2) : 0;
        const protein = props.searchResults[obj].food.nutrients.PROCNT ? props.searchResults[obj].food.nutrients.PROCNT.toFixed(2) : 0;
        const fat = props.searchResults[obj].food.nutrients.FAT ? props.searchResults[obj].food.nutrients.FAT.toFixed(2) : 0;
        return (

      <Link style={{ textDecoration: 'none' }} to={{pathname:'/dashboard', state:{
       edamam_id: edamam_id,
       edamam_name: edamam_name,
       calories: calories,
       carbs: carbs,
       protein: protein,
       fat: fat
      }}} >
        <ResultDiv
        key={props.searchResults[obj].food.foodId}
        onClick={props.handleFoodSubmit}>
          <ResultTitle> { edamam_name }</ResultTitle>
          <ResultInfo>
            <ResultInfoP><ResultSpan>calories:</ResultSpan> { calories } </ResultInfoP>
            <ResultInfoP><ResultSpan>carbs:</ResultSpan> { carbs }</ResultInfoP>
          </ResultInfo>
          <ResultInfo>
            <ResultInfoP><ResultSpan>protein:</ResultSpan> { protein } </ResultInfoP>
            <ResultInfoP><ResultSpan>fat:</ResultSpan> { fat } </ResultInfoP>
          </ResultInfo>
        </ResultDiv>
      </Link>
    );
      })}
      {!props.searchResults}  <NoResultDiv> {props.noResultError} </NoResultDiv>

      </Modal>
  )
}

export default AppModal;
