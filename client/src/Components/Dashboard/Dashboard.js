import React, { Component } from "react";
import Calories from "./Calories";
import EntryForm from "./EntryForm";
import ModifiedEntryForm from "./ModifiedEntryForm";
import FoodEntry from "./FoodEntry";
import Exercise from "./Exercise";
import ExerciseEntry from "./ExerEntry";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import moment from "moment";
import gql from "graphql-tag";
import { ADD_EXERENTRY, ADD_FOOD_ENTRY, DELETE_EXERENTRY } from "../../graphql/mutations";
import { EXER_QUERY, GET_CURRENT_USERID, GET_EXERCISE_ENTRIES_QUERY } from "../../graphql/queries";

const GET_FOOD_ENTRIES_BY_USER_QUERY = gql`
  query($userId: ID!) {
    getFoodEntriesByUserId(userId: $userId) {
      id
      date
      servingQty
      user_id {
        username
        firstName
        lastName
        email
        id
      }
      food_id {
        foodName
        caloriesPerServ
        fats
        proteins
        carbs
      }
      meal_category_id {
        mealCategoryName
      }
    }
  }
`;

class Dashboard extends Component {
  state = {
    showFoodForm: true,
    showExerForm: true,
    currentUser: null,
    exerEntries: [],
    foodEntries: [],
    userType: "",
    exerEntry: []
  };

  componentDidMount = () => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .query({
        query: GET_CURRENT_USERID
      })
      .then(response => {
        console.log(response.data.getCurrentUser);
        this.setState({
          currentUser: response.data.getCurrentUser.id,
          userType: response.data.getCurrentUser.userType
        });
        client
          .query({
            query: EXER_QUERY,
            variables: {
              userId: this.state.currentUser
            }
          })
          .then(response => {
            this.setState({
              exerEntries: response.data.getExerciseEntriesByUserId
            });
            client
              .query({
                query: GET_FOOD_ENTRIES_BY_USER_QUERY,
                variables: {
                  userId: this.state.currentUser
                }
              })
              .then(response => {
                this.setState({
                  foodEntries: response.data.getFoodEntriesByUserId
                });
              });
          });
      })
      .catch(err => console.log(err));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedFood !== this.props.selectedFood) {
      this.setState({ showFoodForm: false });
      const idToken = localStorage.getItem("token");
      const client = new ApolloClient({
        uri: "https://nutrition-tracker-be.herokuapp.com",
        headers: { authorization: idToken }
      });
      client
        .query({
          query: GET_CURRENT_USERID
        })
        .then(response => {
          this.setState({ currentUser: response.data.getCurrentUser.id });
          client
            .query({
              query: EXER_QUERY,
              variables: {
                userId: this.state.currentUser
              }
            })
            .then(response => {
              this.setState({
                exerEntries: response.data.getExerciseEntriesByUserId
              });
              client
                .query({
                  query: GET_FOOD_ENTRIES_BY_USER_QUERY,
                  variables: {
                    userId: this.state.currentUser
                  }
                })
                .then(response => {
                  console.log(this.state.currentUser);
                  console.log("food response", response);
                  this.setState({
                    foodEntries: response.data.getFoodEntriesByUserId
                  });
                });
            });
        })
        .catch(err => console.log(err));
    }

  }

  addFoodEntry = newFoodEntry => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: ADD_FOOD_ENTRY,
        variables: {
          input: newFoodEntry
        }
      })
      .then(response => {
        client
          .query({
            query: GET_FOOD_ENTRIES_BY_USER_QUERY,
            variables: {
              userId: this.state.currentUser
            }
          })
          .then(response => {
            this.setState({
              foodEntries: response.data.getFoodEntriesByUserId
            });
          });
      })
      .catch(err => console.log(err));
  };

  addExerEntry = newExerEntry => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .mutate({
        mutation: ADD_EXERENTRY,
        variables: {
          input: newExerEntry
        }
      })
      .then(response => {
        client
          .query({
            query: EXER_QUERY,
            variables: {
              userId: this.state.currentUser
            }
          })
          .then(response => {
            this.setState({
              exerEntries: response.data.getExerciseEntriesByUserId
            });
          });
      })
      .catch(err => console.log(err));
  };

  onInputChange = e => {
    this.setState({
      exerEntry: {
        ...this.state.exerEntry,
        [e.target.name]:
          e.target.type === "number" ? parseInt(e.target.value) : e.target.value
      }
    });
    console.log("exerentry change",this.state.exerEntry)
  };

  editExerEntry = (entry) => {
    console.log('edit', entry)
    console.log(this.state.exerEntry)
  }

  

  deleteExerEntry = ( id, idToken) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .mutate({
        mutation: DELETE_EXERENTRY,
        variables: {id}
      })
      .then(response => {
        client
        .query({
          query: GET_EXERCISE_ENTRIES_QUERY,
          variables:{
            userId: this.state.currentUser
          }
        })
        .then(response => {
          console.log(response);
          console.log('this before', this.state.exerEntries)
          this.setState({
            exerEntry: "",
            exerEntries: response.data.getExerciseEntriesByUserId
           });
           console.log('this after', this.state.exerEntries)
        })
      })
      .catch(err => console.log(err));
  }

  handleShowFood = () => {
    this.setState({
      showFoodForm: true,
      selectedFood: {}
    });
    console.log(this.state);
  };

  closeFoodForm = () => {
    this.setState({
      showFoodForm: false,
      selectedFood: null
    });
  };

  revertToNormalForm = () => {
    this.setState({
      showFoodForm: true
    });
  };

  openExerEntry = () => {
    this.setState({
      showExerForm: true
    });
  };

  closeExerEntry = () => {
    this.setState({
      showExerForm: false
    });
  };

  passExerData = (entry) => {
    this.setState({
      exerEntry: entry
    })
  }

  render() {
    const currentDate = moment(new Date()).format("MMMM Do YYYY");
    if (this.state.userType === "Super User") {
      return (
        <DashContainer>
          <DashTitle>{currentDate}</DashTitle>
          <Calories />
          <DashDisplay className="container">
            <InfoCon>
              <FoodEntry foodEntries={this.state.foodEntries} />
              <ExerciseEntry
                exerEntries={this.state.exerEntries}
                deleteExerEntry={this.deleteExerEntry}
                onInputChange={this.onInputChange}
                exerEntry={this.state.exerEntry}
                editExerEntry={this.editExerEntry}
                passExerData={this.passExerData}
                />
            </InfoCon>

            {this.state.showFoodForm && (
              <EntryForm
                addFoodEntry={this.addFoodEntry}
                closeFoodForm={this.closeFoodForm}
              />
            )}

            {!this.state.showFoodForm && (
              <ModifiedEntryForm
                addFoodEntry={this.addFoodEntry}
                selectedFood={this.props.selectedFood}
                handleShowFood={this.handleShowFood}
                revertToNormalForm={this.revertToNormalForm}
              />
            )}

            {this.state.showExerForm && (
              <Exercise
                closeExerEntry={this.closeExerEntry}
                addExerEntry={this.addExerEntry}
              />
            )}
          </DashDisplay>
        </DashContainer>
      );
    } else {
      return (
        <DashContainer>
          <DashTitle>{currentDate}</DashTitle>
          <Calories />
          <DashDisplay className="container">
            <InfoCon>
              <FoodEntry foodEntries={this.state.foodEntries} />
            </InfoCon>

            {this.state.showFoodForm && (
              <EntryForm
                addFoodEntry={this.addFoodEntry}
                closeFoodForm={this.closeFoodForm}
              />
            )}

            {!this.state.showFoodForm && (
              <ModifiedEntryForm
                addFoodEntry={this.addFoodEntry}
                selectedFood={this.props.selectedFood}
                handleShowFood={this.handleShowFood}
                revertToNormalForm={this.revertToNormalForm}
              />
            )}
          </DashDisplay>
        </DashContainer>
      );
    }
  }
}

const DashContainer = styled.div`
  width: 100%;
`;

const DashTitle = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const InfoCon = styled.div`
  display: flex;
  width: 40%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const DashDisplay = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default Dashboard;
