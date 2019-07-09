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
import CardContent from "@material-ui/core/CardContent";

import {
  ADD_EXERENTRY,
  ADD_FOOD_ENTRY,
  DELETE_EXERENTRY,
  EDIT_EXER_ENTRY,
  DELETE_FOOD_ENTRY,
  EDIT_FOOD_ENTRY,
  EDIT_FOOD
} from "../../graphql/mutations";
import {
  EXER_QUERY,
  GET_CURRENT_USERID,
  GET_EXERCISE_ENTRIES_QUERY,
  GET_FOOD_ENTRIES_BY_USER_QUERY
} from "../../graphql/queries";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const styles = theme => ({
  root: {
    maxWidth: 960,
    width: "100%",
    marginBottom: "3%",
    color: "#545454"
  },
  date: {
    margin: "50px auto 0 auto",
    padding: 20,
    fontFamily: "Oswald",
    textAlign: "center",
    color: "#545454"
  },
  title: {
    // flexGrow: 1,
    fontSize: 20,
    background: "#5E366A",
    padding: 10,
    color: "#ffffff",
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: "1.3px",

  },
  flexData: {
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
    },
    color: "#545454"
  },
  flexDataCon: {
    width: "100%",
    // maxWidth: 300,
    margin: 0,
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
    
  },
  flexDataConFirst: {
    width: "100%",
    maxWidth: 300,
    margin: 0,
    padding: "0 0 0 32",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      maxWidth: "100%"
    }
  },
  heading: {
    fontFamily: "Oswald",
    fontWeight: 100,
    fontSize: "2.5rem",
    // textTransform: "uppercase"
  }
});

const Hr = styled.div`
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
  width: 90%;
  height: 1px;
`;

// const GET_FOOD_ENTRIES_BY_USER_QUERY = gql`
//   query getFoodEntriesByUserId($userId: ID!) {
//     getFoodEntriesByUserId(userId: $userId) {
//       id
//       date
//       servingQty
//       user_id {
//         username
//         firstName
//         lastName
//         email
//         id
//       }
//       food_id {
//         id
//         foodName
//         caloriesPerServ
//         fats
//         proteins
//         carbs
//         edamam_id
//       }
//       meal_category_id {
//         id
//         mealCategoryName
//       }
//     }
//   }
// `;

class Dashboard extends Component {
  state = {
    showFoodForm: true,
    showExerForm: true,
    currentUser: null,
    exerEntries: [],
    foodEntries: [],
    userType: "",
    exerEntry: [],
    foodEntry: [],
    foodIsLoading: true,
    exerIsLoading: true
  };

  componentDidMount = () => {
    if (this.props.selectedFood ){
      this.setState({
        showFoodForm: false
      })
    }
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
              exerEntries: response.data.getExerciseEntriesByUserId,
              exerIsLoading: false
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
                  foodEntry: response.data.getFoodEntriesByUserId,
                  foodEntries: response.data.getFoodEntriesByUserId,
                  foodIsLoading: false
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
    e.preventDefault();
    let food_id = this.state.foodEntry.food_id;
    let key = e.target.name;
    let value = e.target.value;
    food_id[key] = value;
    this.setState({
      foodEntry: {
        ...this.state.foodEntry,
        [e.target.name]:
          e.target.type === "number" ? parseInt(e.target.value) : e.target.value
      }
    });
    console.log(this.state.foodEntry.foodName);
  };

  onFoodChange = e => {
    this.setState({
      foodEntry: {
        food_id: {
          ...this.state.foodEntry.food_id,
          [e.target.name]:
            e.target.type === "number"
              ? parseInt(e.target.value)
              : e.target.value
        }
      }
    });
  };
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
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    const edamam_id = editEntry.food_id.edamam_id ? editEntry.food_id.edamam_id : null
    const foodId = parseInt(editEntry.food_id.id);
    const mealCategoryId = parseInt(editEntry.meal_category_id.id)

    const foodInput = {
      foodName: editEntry.food_id.foodName,
      caloriesPerServ: parseInt(editEntry.food_id.caloriesPerServ),
      fats: parseFloat(editEntry.food_id.fats),
      carbs: parseFloat(editEntry.food_id.carbs),
      proteins: parseFloat(editEntry.food_id.proteins),
      edamam_id: edamam_id,
    };

    const foodEntryInput = {
      date: editEntry.date,
      food_id: parseInt(foodId),
      user_id: parseInt(this.state.currentUser),
      servingQty: parseInt(editEntry.servingQty),
      meal_category_id: parseInt(mealCategoryId)
    }

    client
      .mutate({
        mutation: EDIT_FOOD,
        variables: {
        id: foodId,
        input: foodInput
      }
    })
    .then(response => {
      client
        .mutate({
          mutation: EDIT_FOOD_ENTRY,
          variables: {
            id: editId,
            variables: foodEntryInput
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
    })
  }


  editExerEntry = (editId, editEntry, idToken) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .mutate({
        mutation: EDIT_EXER_ENTRY,
        variables: { id: editId, input: editEntry }
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

  deleteFoodEntry = (id, idToken) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .mutate({
        mutation: DELETE_FOOD_ENTRY,
        variables: { id }
      })
      .then(response => {
        console.log(response);
        client
          .query({
            query: GET_FOOD_ENTRIES_BY_USER_QUERY,
            variables: {
              userId: this.state.currentUser
            }
          })
          .then(response => {
            console.log(response);
            this.setState({
              foodEntry: "",
              foodEntries: response.data.getFoodEntriesByUserId
            });
          });
      })
      .catch(err => console.log(err));
  };

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
          <Typography variant="h3" className={classes.date}>
            {currentDate}
          </Typography>
          <Card>
            <CardContent>
              <Typography className={classes.title}>
                Today's Summary:
              </Typography>
            </CardContent>
            <CardContent>
              <Calories />
            </CardContent>
            <CardContent className={classes.flexData}>
              {!this.state.foodIsLoading ? (
                <Container className={classes.flexDataConFirst}>
                  <Typography className={classes.heading}>Meals</Typography>
                  <hr />
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
                </Container>
              ) : (
                <CircularProgress />
              )}
              <Container className={classes.forms}>
                {this.state.showFoodForm && (
                  <Container className={classes.flexDataCon}>
                    <EntryForm
                      addFoodEntry={this.addFoodEntry}
                      closeFoodForm={this.closeFoodForm}
                      searchedFood={this.props.selectedFood}
                    />
                  </Container>
                )}
                {!this.state.showFoodForm && (
                  <Container className={classes.flexDataCon}>
                    <ModifiedEntryForm
                      addFoodEntry={this.addFoodEntry}
                      selectedFood={this.props.selectedFood}
                      handleShowFood={this.handleShowFood}
                      revertToNormalForm={this.revertToNormalForm}
                    />
                  </Container>
                )}
              </Container>
            </CardContent>
            <Hr />
            <CardContent className={classes.forms}>
              {this.state.showExerForm && (
                <>
                  <CardContent className={classes.flexData}>
                    {!this.state.exerIsLoading ? (
                      <Container className={classes.flexDataConFirst}>
                        <Typography className={classes.heading}>
                          Activity
                        </Typography>
                        <ExerciseEntry
                          exerEntries={this.state.exerEntries}
                          deleteExerEntry={this.deleteExerEntry}
                          onInputChange={this.onInputChange}
                          exerEntry={this.state.exerEntry}
                          editExerEntry={this.editExerEntry}
                          passExerData={this.passExerData}
                        />
                      </Container>
                    ) : (
                      <CircularProgress />
                    )}
                    <Container className={classes.flexDataCon}>
                      <Exercise
                        editExerEntry={this.editExerEntry}
                        closeExerEntry={this.closeExerEntry}
                        addExerEntry={this.addExerEntry}
                      />
                    </Container>
                  </CardContent>
                </>
              )}
            </CardContent>
          </Card>
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
                searchedFood={this.props.selectedFood}
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
  margin-top: 5%;
  margin-bottom: 4%;
  justify-content: space-around;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  } */
`;
export default withStyles(styles)(Dashboard);
