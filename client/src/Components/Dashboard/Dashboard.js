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
import Card from "@material-ui/core/Card";

import {
  ADD_EXERENTRY,
  ADD_FOOD_ENTRY,
  DELETE_EXERENTRY,
  EDIT_EXER_ENTRY,
  DELETE_FOOD_ENTRY
} from "../../graphql/mutations";
import {
  EXER_QUERY,
  GET_CURRENT_USERID,
  GET_EXERCISE_ENTRIES_QUERY
} from "../../graphql/queries";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    maxWidth: 960,
    width: "100%"
  },
  forms: {
    display: "flex"
  }
});

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
        id
        foodName
        caloriesPerServ
        fats
        proteins
        carbs
      }
      meal_category_id {
        id
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
    exerEntry: [],
    foodEntry: []
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
    console.log("exerentry change", this.state.exerEntry);
  };

  onFoodEntryChange = e => {
    this.setState({
      foodEntry: {
        ...this.state.foodEntry,
        [e.target.name]:
          e.target.type === "number" ? parseInt(e.target.value) : e.target.value
      }
    })
    console.log(this.state.foodEntry.foodName)
  }

  onFoodChange = e => {
    this.setState({
      foodEntry:{
        food_id:{
          ...this.state.foodEntry.food_id,
          [e.target.name]:
            e.target.type === "number" ? parseInt(e.target.value) : e.target.value
        }
      }
    })
  }
  // onMealChange = e => {
  //   this.setState({
  //     foodEntry:{
  //       meal_category_id:{
  //         ...this.state.foodEntry.meal_category_id,
  //         [e.target.name]:
  //           e.target.type === "number" ? parseInt(e.target.value) : e.target.value
  //       }
  //     }
  //   })
  // }

  editFoodEntry = (editId, editEntry, idToken) => {
    console.log('arg', editEntry)
    console.log('props', this.state.foodEntry)
  }

  editExerEntry = ( editId, editEntry, idToken) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .mutate({
        mutation: EDIT_EXER_ENTRY,
        variables: {id: editId, input: editEntry}
      })
      .then(response => {
        client
          .query({
            query: GET_EXERCISE_ENTRIES_QUERY,
            variables: {
              userId: this.state.currentUser
            }
          })
          .then(response => {
            this.setState({
              exerEntry: "",
              exerEntries: response.data.getExerciseEntriesByUserId
            });
          });
      })
      .catch(err => console.log(err));
  }

  deleteFoodEntry = (id, idToken) => {
    const client = new ApolloClient({
    uri: "https://nutrition-tracker-be.herokuapp.com",
    headers: { authorization: idToken }
    });
    client
      .mutate({
        mutation: DELETE_FOOD_ENTRY,
        variables: {id}
      })
      .then(response => {
        console.log(response)
        client
        .query({
          query: GET_FOOD_ENTRIES_BY_USER_QUERY,
          variables:{
            userId: this.state.currentUser
          }
        })
        .then(response => {
          console.log(response)
          this.setState({
            foodEntry: "",
            foodEntries: response.data.getFoodEntriesByUserId
           });
        })
      })
    .catch(err => console.log(err));
  }

  deleteExerEntry = (id, idToken) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .mutate({
        mutation: DELETE_EXERENTRY,
        variables: { id }
      })
      .then(response => {
        client
          .query({
            query: GET_EXERCISE_ENTRIES_QUERY,
            variables: {
              userId: this.state.currentUser
            }
          })
          .then(response => {
            this.setState({
              exerEntry: "",
              exerEntries: response.data.getExerciseEntriesByUserId
            });
          });
      })
      .catch(err => console.log(err));
  };

  handleShowFood = () => {
    this.setState({
      showFoodForm: true,
      selectedFood: {}
    });
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

  passExerData = entry => {
    this.setState({
      exerEntry: entry
    });
  };

  passFoodData = entry => {
    this.setState({
      foodEntry: entry
    });
  };


  render() {
    const { classes } = this.props;
    const currentDate = moment(new Date()).format("MMMM Do YYYY");
    if (this.state.userType === "Super User") {
      return (
        <Container className={classes.root}>
          <Typography variant="h3">{currentDate}</Typography>
          <Calories />
          <DashDisplay className="container">
            <Card>
              <FoodEntry
              foodEntries={this.state.foodEntries}
              deleteFoodEntry={this.deleteFoodEntry}
              foodEntry={this.state.foodEntry}
              onFoodEntryChange={this.onFoodEntryChange}
              onFoodChange={this.onFoodChange}
              onMealChange={this.onMealChange}
              editFoodEntry={this.editFoodEntry}
              passFoodData={this.passFoodData}
              />
              <ExerciseEntry
                exerEntries={this.state.exerEntries}
                deleteExerEntry={this.deleteExerEntry}
                onInputChange={this.onInputChange}
                exerEntry={this.state.exerEntry}
                editExerEntry={this.editExerEntry}
                passExerData={this.passExerData}
              />
            </Card>
            <Card className={classes.forms}>
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
                  editExerEntry={this.editExerEntry}
                  closeExerEntry={this.closeExerEntry}
                  addExerEntry={this.addExerEntry}
                />
              )}
            </Card>
          </DashDisplay>
        </Container>
      );
    } else {
      return (
        <Container className={classes.root}>
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
        </Container>
      );
    }
  }
}

const DashTitle = styled.div`
  /* font-size: 3rem;
  text-align: center; */
`;

const InfoCon = styled.div`
  /* display: flex;
  width: 40%;
  @media (max-width: 800px) {
    width: 100%; */
  /* } */
`;

const DashDisplay = styled.div`
  /* width: 100%;
  display: flex;
  justify-content: space-around;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  } */
`;

export default withStyles(styles)(Dashboard);
