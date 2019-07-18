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
import * as moment from "moment";
import ApolloClient from "apollo-boost";

import { GET_CURRENT_USER_QUERY, GET_FOOD_BY_ID } from "../../graphql/queries";
import MealFoods from "./MealFoods";

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
      currentUser: 0,
      mealCategoryName: null
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
        query: GET_CURRENT_USER_QUERY
      })
      .then(response => {
        this.setState({ currentUser: response.data.getCurrentUser.id });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.foodEntries !== this.props.foodEntries ||
      prevProps.datePicked !== this.props.datePicked
    ) {
      this.setState({ foodEntries: this.props.foodEntries });
    }

    if (prevState.mealCategoryName !== this.state.mealCategoryName) {
      this.setState({ mealCategoryName: this.state.mealCategoryName });
    }
  }

  passMealData = async mealEntry => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com"
    });
    try {
      const foodquery = await client.query({
        query: GET_FOOD_BY_ID,
        variables: {
          foodId: mealEntry.food_id.id
        }
      });
      if (foodquery.data.getFoodById.edamam_id) {
        this.setState({
          mealEntry: mealEntry,
          edamamExist: true,
          meal_category_id: mealEntry.meal_category_id.id.toString()
        });
      } else {
        this.setState({
          mealEntry: mealEntry,
          edamamExist: false,
          meal_category_id: mealEntry.meal_category_id.id.toString()
        });
      }
    } catch (err) {
      console.log(err);
    }
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
      meal_category_id: null,
      edamamExist: false
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

    this.setState({
      mealEntry: null,
      edamamExist: false
    });
    this.closeModal();
  };

  render() {
    const { classes, datePicked } = this.props;
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

    const mealCategories = [
      { cat: "Breakfast", foods: Breakfast },
      { cat: "Lunch", foods: Lunch },
      { cat: "Dinner", foods: Dinner },
      { cat: "Snack", foods: Snack }
    ];

    return (
      <div className={classes.root}>
        <h2 className={classes.header}>{this.props.datePicked}</h2>
        <List className={classes.root} disablePadding dense>
          {mealCategories.map((mealCategory, i) => {
            return (
              <MealFoods
                key={i}
                category={mealCategory.cat}
                foods={mealCategory.foods}
                passMealData={this.passMealData}
              />
            );
          })}
        </List>

        {this.state.mealEntry && (
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
            <DialogTitle
              id="form-dialog-title"
              classes={{ root: classes.title }}
            >
              <span className={classes.title}> Edit Entry </span>
            </DialogTitle>
            <DialogContent classes={{ root: classes.dialogBox }} dividers>
              <DialogContentText classes={{ root: classes.food }}>
                <span className={classes.food}>
                  {this.state.mealEntry.food_id.foodName}
                </span>
              </DialogContentText>
              <TextField
                onChange={this.handleChange}
                name="date"
                id="date"
                label="Day"
                value={this.state.date}
                defaultValue={moment(
                  new Date(this.state.mealEntry.date)
                ).format("YYYY-MM-DD")}
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
                placeholder={this.state.mealEntry.servingQty}
                value={this.state.servingQty}
                defaultValue={this.state.mealEntry.servingQty}
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

              {this.state.edamamExist && (
                <>
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Calories Per Serving"
                    defaultValue={this.state.mealEntry.food_id.caloriesPerServ}
                    margin="dense"
                  />
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Proteins"
                    defaultValue={this.state.mealEntry.food_id.proteins}
                    margin="dense"
                  />
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Carbs"
                    defaultValue={this.state.mealEntry.food_id.carbs}
                    margin="dense"
                  />
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Fats"
                    defaultValue={this.state.mealEntry.food_id.fats}
                    margin="dense"
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

              {!this.state.edamamExist && (
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
        )}
      </div>
    );
  }
}

export default withStyles(styles)(JournalEntry);
