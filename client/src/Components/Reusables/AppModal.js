import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const ResultDiv = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 2px solid #2c363f;
  flex-direction: column;
  overflow: hidden;
  text-decoration: none;
  transition: 0.3s all ease-out;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    background: rgba(94,54,106, 0.1);
  }
`;
const ResultTitle = styled.h1`
  color: #40a798;
  font-size: 20px;
  font-size: 2rem;
  font-family: "Oswald";
  padding: 10px 0;
  text-transform: capitalize;
`;

const ResultInfo = styled.div`
  padding: 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const ResultInfoP = styled.p`
  font-size: 16px;
  font-size: 1.6rem;
  color: #2c363f;
`;
const ResultSpan = styled.span`
  color: #40a798;
`;

const ModalButton = styled.button`
  padding: 5px 30px;
  margin-right: 20px;
  font-size: 16px;
  font-size: 1.6rem;
  font-weight: 500;
  background: #5e366a;
  border: 1px solid #5e366a;
  color: #fcfcfb;
  display: block;
  right: 0;
  position: fixed;
  cursor: pointer;
  &:hover {
    background: #ffffff;
    color: #5e366a;
  }
`;

const NoResultDiv = styled.div`
  padding: 20px 30px;
  font-size: 1.4em;
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 500px;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
  }
};


Modal.setAppElement("#root");

const AppModal = props => {
  if (props.resultsLoading) {
    return (
      <Modal style={customStyles} isOpen={props.isOpen}>
        <LoadingDiv>
          <CircularProgress />
        </LoadingDiv>
      </Modal>
    );
  } else {
    return (
      <Modal style={customStyles} isOpen={props.isOpen}>
        <ModalButton onClick={props.closeModal}>Close</ModalButton>

        {props.searchResults.length === 0 && (
          <NoResultDiv> No Results Found </NoResultDiv>
        )}

        {props.searchResults &&
          props.searchResults.map((food, index) => {
            const edamam_name =
              food.food.label.charAt(0).toUpperCase() +
              food.food.label.slice(1).toLowerCase();
            const calories = food.food.nutrients.ENERC_KCAL
              ? food.food.nutrients.ENERC_KCAL.toFixed(2)
              : 0;
            const carbs = food.food.nutrients.CHOCDF
              ? food.food.nutrients.CHOCDF.toFixed(2)
              : 0;
            const protein = food.food.nutrients.PROCNT
              ? food.food.nutrients.PROCNT.toFixed(2)
              : 0;
            const fat = food.food.nutrients.FAT
              ? food.food.nutrients.FAT.toFixed(2)
              : 0;
            return (
              <Link
                key={index}
                style={{ textDecoration: "none" }}
                to={{ pathname: "/dashboard" }}
              >
                <ResultDiv onClick={() => props.handleFoodSubmit(food.food)}>
                  <ResultTitle>{edamam_name}</ResultTitle>
                  <ResultInfo>
                    <ResultInfoP>
                      <ResultSpan>calories:</ResultSpan> {calories}{" "}
                    </ResultInfoP>
                    <ResultInfoP>
                      <ResultSpan>carbs:</ResultSpan> {carbs}
                    </ResultInfoP>
                    {/* </ResultInfo>
                  <ResultInfo> */}
                    <ResultInfoP>
                      <ResultSpan>protein:</ResultSpan> {protein}{" "}
                    </ResultInfoP>
                    <ResultInfoP>
                      <ResultSpan>fat:</ResultSpan> {fat}{" "}
                    </ResultInfoP>
                  </ResultInfo>
                </ResultDiv>
              </Link>
            );
          })}
      </Modal>
    );
  }
};

export default AppModal;
