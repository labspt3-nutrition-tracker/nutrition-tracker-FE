import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as moment from "moment";

import { GET_CURRENT_USERID } from "../../graphql/queries";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const styles = theme => ({
  root: {
    marginBottom: 20
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#5E366A",
    textTransform: "uppercase",
    fontFamily: "Oswald",
    margin: "3% 0"
  },
  mealCategory: {
    color: "#60B5A9",
    fontSize: "1.8rem",
    fontFamily: "Oswald"
  },
  foodEntry: {
    fontSize: "1.8rem",
    paddingLeft: "10px",
    fontFamily: "Oswald"
  },
  list: {
    width: "70%"
  },
  categoryList: {
    alignItems: "flex-start"
  },
  dialogBox: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontFamily: "Oswald",
    fontSize: "3rem",
    color: "#5E366A",
    padding: "0 12px"
  },
  food: {
    fontFamily: "Oswald",
    fontSize: "2.5rem",
    color: "#5E366A",
    margin: 0
  },
  label: {
    fontSize: "1.5rem",
    marginTop: "10px",
    marginBottom: "5px",
    fontFamily: "Oswald",
    color: "#60B5A9"
  },
  category: {
    fontSize: "1.6rem",
    fontFamily: "Oswald"
  },
  btn: {
    fontSize: "1.4rem",
    color: "#FCFCFB",
    border: "2px solid #5E366A",
    backgroundColor: "#5E366A",
    padding: "5px 8px",
    "&:hover": {
      backgroundColor: "white",
      color: "#545454"
    },
    fontFamily: "Oswald"
  },
  buttons: { justifyContent: "space-around" },
  del: {
    fontSize: "1.4rem",
    color: "#FCFCFB",
    border: "2px solid #40A798",
    padding: "5px 8px",
    "&:hover": {
      backgroundColor: "white",
      color: "#40A798"
    },
    fontFamily: "Oswald",
    backgroundColor: "#40A798"
  }
});

const GET_FOOD_BY_ID = gql`
  query getFoodById($foodId: ID!) {
    getFoodById(foodId: $foodId) {
      id
      edamam_id
    }
  }
`;

class JournalEntry extends React.Component {
  constructor(props) {
    super(props);

    const { foodEntries } = props;
    this.state = {
      foodEntries: foodEntries,
      edamamExist: false,
      // journalEntry: {
      date: null,
      foodName: null,
      servingQty: null,
      caloriesPerServ: null,
      proteins: null,
      carbs: null,
      fats: null,
      mealEntry: null,
      user_id: null,
      food_id: null,
      meal_category_id: null,
      showModal: false,
      currentUser: 0
      // }
    };
  }

  componentDidMount() {
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
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.foodEntries !== this.props.foodEntries ||
      prevProps.datePicked !== this.props.datePicked
    ) {
      this.setState({ foodEntries: this.props.foodEntries });
    }
  }

  passMealData = mealEntry => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });

    client
      .query({
        query: GET_FOOD_BY_ID,
        variables: {
          foodId: mealEntry.food_id.id
        }
      })
      .then(response => {
        if (response.data.getFoodById.edamam_id !== "") {
          this.setState({
            edamamExist: true,
            caloriesPerServ: mealEntry.caloriesPerServ,
            proteins: mealEntry.proteins,
            carbs: mealEntry.carbs,
            fats: mealEntry.fats
          });
        } else {
          this.setState({
            edamamExist: false
          });
        }
      })
      .catch(err => console.log(err));

    this.setState({
      mealEntry: mealEntry
    });

    this.openModal();
  };

  openModal = () => {
    this.setState({
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      mealEntry: null,
      meal_category_id: null
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  deleteMealEntry = e => {
    e.preventDefault();
    this.props.deleteMeal(this.state.mealEntry.id);

    this.closeModal();
  };

  editMealEntry = e => {
    e.preventDefault();

    const foodEntry = {
      foodName: this.state.mealEntry.food_id.foodName,
      caloriesPerServ: this.state.caloriesPerServ
        ? parseInt(this.state.caloriesPerServ)
        : this.state.mealEntry.food_id.caloriesPerServ,
      fats: this.state.fats
        ? parseInt(this.state.fats)
        : this.state.mealEntry.food_id.fats,
      carbs: this.state.carbs
        ? parseInt(this.state.carbs)
        : this.state.mealEntry.food_id.carbs,
      proteins: this.state.proteins
        ? parseInt(this.state.proteins)
        : this.state.mealEntry.food_id.proteins,
      date: this.state.date ? this.state.date : this.state.mealEntry.date,
      food_id: this.state.mealEntry.food_id.id,
      user_id: this.state.currentUser,
      meal_category_id: this.state.meal_category_id
        ? this.state.meal_category_id
        : this.state.mealEntry.meal_category_id.id,
      servingQty: this.state.servingQty
        ? parseInt(this.state.servingQty)
        : this.state.mealEntry.servingQty
    };

    this.props.editMeal(
      this.state.mealEntry.id,
      this.state.mealEntry.food_id.id,
      foodEntry
    );
    this.closeModal();
  };

  render() {
    const { classes } = this.props;
    const datePicked = this.props.datePicked;
    const ModifiedEntry = this.state.foodEntries.filter(function(entry) {
      //  return entry.date === datePicked;
      return (
        moment(new Date(entry.date)).format("MM/DD") ===
        moment(new Date(datePicked)).format("MM/DD")
      );
    });
    // set as new foodentries
    const Breakfast = ModifiedEntry.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Breakfast";
    });

    const Lunch = ModifiedEntry.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Lunch";
    });

    const Dinner = ModifiedEntry.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Dinner";
    });

    const Snack = ModifiedEntry.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Snack";
    });

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>{this.props.datePicked}</h2>
        <List className={classes.root} disablePadding dense>
          <ListItem classes={{ root: classes.categoryList }}>
            <ListItemText
              primary="Breakfast"
              classes={{ primary: classes.mealCategory }}
            />
            <List
              component="div"
              disablePadding
              dense
              classes={{ root: classes.list }}
            >
              {Breakfast.length > 0 ? (
                Breakfast.map(breakfast => {
                  return (
                    <>
                      <ListItem
                        key={breakfast.id}
                        button
                        onClick={() => this.passMealData(breakfast)}
                      >
                        <ListItemText
                          primary={breakfast.food_id.foodName}
                          classes={{ primary: classes.foodEntry }}
                        />
                      </ListItem>
                    </>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No Breakfast entries"
                    classes={{ primary: classes.foodEntry }}
                  />
                </ListItem>
              )}
            </List>
          </ListItem>
          <ListItem classes={{ root: classes.categoryList }}>
            <ListItemText
              primary="Lunch"
              classes={{ primary: classes.mealCategory }}
            />
            <List
              component="div"
              disablePadding
              dense
              classes={{ root: classes.list }}
            >
              {Lunch.length > 0 ? (
                Lunch.map(lunch => {
                  return (
                    <>
                      <ListItem
                        key={lunch.id}
                        button
                        onClick={() => this.passMealData(lunch)}
                      >
                        <ListItemText
                          primary={lunch.food_id.foodName}
                          classes={{ primary: classes.foodEntry }}
                        />
                      </ListItem>
                    </>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No Lunch entries"
                    classes={{ primary: classes.foodEntry }}
                  />
                </ListItem>
              )}
            </List>
          </ListItem>
          <ListItem classes={{ root: classes.categoryList }}>
            <ListItemText
              primary="Dinner"
              classes={{ primary: classes.mealCategory }}
            />
            <List
              component="div"
              disablePadding
              dense
              classes={{ root: classes.list }}
            >
              {Dinner.length > 0 ? (
                Dinner.map(dinner => {
                  return (
                    <>
                      <ListItem
                        key={dinner.id}
                        button
                        onClick={() => this.passMealData(dinner)}
                      >
                        <ListItemText
                          primary={dinner.food_id.foodName}
                          classes={{ primary: classes.foodEntry }}
                        />
                      </ListItem>
                    </>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No Dinner entries"
                    classes={{ primary: classes.foodEntry }}
                  />
                </ListItem>
              )}
            </List>
          </ListItem>

          <ListItem classes={{ root: classes.categoryList }}>
            <ListItemText
              primary="Snack"
              classes={{ primary: classes.mealCategory }}
            />
            <List
              component="div"
              disablePadding
              dense
              classes={{ root: classes.list }}
            >
              {Snack.length > 0 ? (
                Snack.map(snack => {
                  return (
                    <>
                      <ListItem
                        key={snack.id}
                        button
                        onClick={() => this.passMealData(snack)}
                      >
                        <ListItemText
                          primary={snack.food_id.foodName}
                          classes={{ primary: classes.foodEntry }}
                        />
                      </ListItem>
                    </>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No snack entries"
                    classes={{ primary: classes.foodEntry }}
                  />
                </ListItem>
              )}
            </List>
          </ListItem>
        </List>

        <Dialog
          open={this.state.showModal}
          onClose={this.closeModal}
          aria-labelledby="form-dialog-title"
          PaperProps={{
            style: {
              minWidth: "300px"
            }
          }}
        >
          <DialogTitle id="form-dialog-title" classes={{ root: classes.title }}>
            <span className={classes.title}> Edit Entry</span>
          </DialogTitle>
          <DialogContent classes={{ root: classes.dialogBox }} dividers>
            <DialogContentText classes={{ root: classes.food }}>
              <span className={classes.food}>
                {this.state.mealEntry && this.state.mealEntry.food_id.foodName}
              </span>
            </DialogContentText>
            <TextField
              onChange={this.handleChange}
              name="date"
              id="date"
              label="Day"
              value={this.state.date}
              defaultValue={
                this.state.mealEntry &&
                moment(new Date(this.state.mealEntry.date)).format("YYYY-MM-DD")
              }
              type="date"
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: "2rem",
                  color: "#60B5A9",
                  fontFamily: "Oswald"
                }
              }}
              inputProps={{
                style: {
                  fontSize: "1.5rem",
                  lineHeight: "1.5",
                  marginTop: "12px"
                }
              }}
              margin="normal"
            />
            <TextField
              id="Serving Quantity"
              name="servingQty"
              label="Serving Quantity"
              placeholder={
                this.state.mealEntry && `${this.state.mealEntry.servingQty}`
              }
              value={this.state.servingQty}
              defaultValue={
                this.state.mealEntry && this.state.mealEntry.servingQty
              }
              margin="dense"
              onChange={this.handleChange}
              InputLabelProps={{
                shrink: true,
                style: {
                  fontSize: "2rem",
                  color: "#60B5A9",
                  fontFamily: "Oswald"
                }
              }}
              inputProps={{
                style: {
                  fontSize: "1.5rem",
                  lineHeight: "1.5",
                  marginTop: "12px"
                }
              }}
            />
            {this.state.mealEntry && !this.state.edamamExist && (
              <>
                <TextField
                  id="Calories Per Serving"
                  name="caloriesPerServ"
                  label="Calories Per Serving"
                  defaultValue={`${
                    this.state.mealEntry.food_id.caloriesPerServ
                  }`}
                  value={this.state.caloriesPerServ}
                  margin="dense"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontSize: "2rem",
                      color: "#60B5A9",
                      fontFamily: "Oswald"
                    }
                  }}
                  inputProps={{
                    style: {
                      fontSize: "1.5rem",
                      lineHeight: "1.5",
                      marginTop: "12px"
                    }
                  }}
                />
                <TextField
                  id="Protein"
                  name="proteins"
                  label="Protein"
                  defaultValue={`${this.state.mealEntry.food_id.proteins}`}
                  value={this.state.proteins}
                  margin="dense"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontSize: "2rem",
                      color: "#60B5A9",
                      fontFamily: "Oswald"
                    }
                  }}
                  inputProps={{
                    style: {
                      fontSize: "1.5rem",
                      lineHeight: "1.5",
                      marginTop: "12px"
                    }
                  }}
                />
                <TextField
                  id="Carbs"
                  name="carbs"
                  label="Carbs"
                  defaultValue={`${this.state.mealEntry.food_id.carbs}`}
                  value={this.state.carbs}
                  margin="dense"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontSize: "2rem",
                      color: "#60B5A9",
                      fontFamily: "Oswald"
                    }
                  }}
                  inputProps={{
                    style: {
                      fontSize: "1.5rem",
                      lineHeight: "1.5",
                      marginTop: "12px"
                    }
                  }}
                />
                <TextField
                  id="Fats"
                  name="fats"
                  label="Fats"
                  defaultValue={`${this.state.mealEntry.food_id.fats}`}
                  value={this.state.fats}
                  margin="dense"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontSize: "2rem",
                      color: "#60B5A9",
                      fontFamily: "Oswald"
                    }
                  }}
                  inputProps={{
                    style: {
                      fontSize: "1.5rem",
                      lineHeight: "1.5",
                      marginTop: "12px"
                    }
                  }}
                />
              </>
            )}

            <InputLabel htmlFor="meal-simple" className={classes.label}>
              MealCategory
            </InputLabel>
            <Select
              value={this.state.meal_category_id}
              onChange={this.handleChange}
              inputProps={{
                name: "meal_category_id",
                id: "meal-simple"
              }}
              className={classes.category}
            >
              <MenuItem value={1} className={classes.category}>
                Breakfast
              </MenuItem>
              <MenuItem value={2} className={classes.category}>
                Lunch
              </MenuItem>
              <MenuItem value={4} className={classes.category}>
                Dinner
              </MenuItem>
              <MenuItem value={3} className={classes.category}>
                Snack
              </MenuItem>
            </Select>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button onClick={this.closeModal} className={classes.btn}>
              Cancel
            </Button>
            <Button onClick={this.editMealEntry} className={classes.btn}>
              Edit
            </Button>
            <Button onClick={this.deleteMealEntry} className={classes.del}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(JournalEntry);
