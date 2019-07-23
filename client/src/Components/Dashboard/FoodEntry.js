import React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";

import { GET_CURRENT_USER_QUERY, GET_FOOD_BY_ID} from "../../graphql/queries";

const FoodEntryContainer = styled.div`
  width: 100%;
`;

const styles = theme => ({
  root: {
    marginBottom: 20,
    fontFamily: "Oswald",
    fontSize: "1.5rem"
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
  title: {
    fontFamily: "Oswald",
    fontSize: "3rem",
    color: "#5E366A",
    padding: "0 12px"
  },
  dialogBox: {
    display: "flex",
    flexDirection: "column",
  },
  entryContainer: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Oswald",
    fontSize: "3rem"
  },
  food: {
    fontFamily: "Oswald",
    fontSize: "2.5rem",
    color: "#5E366A",
    margin: 0
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
  },
  mealCard: {
    minHeight: 100,
    padding: 0
  },
  mealCon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 16
  },
  mealTitle: {
    fontFamily: "Oswald",
    fontSize: "1.8rem",
    marginTop: 10
  }
});

class FoodEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      showModal: false,
      foodEntry: [],
      edamamExist: false, 
      editFoodObj: {
        date: "",
        foodName: "",
        servingQty: "",
        caloriesPerServ: "",
        proteins: "",
        carbs: "",
        fats: "",
        mealEntry: [],
        user_id: null,
        food_id: null,
        meal_category_id: null
      },
      errorMsg: {
        error: false,
        errorFood: "",
        errorCal: "",
        errorFats: "",
        errorCarbs: "",
        errorProteins: "",
        errorCategory: "",
        errorDate: "",
        errorQty: ""
      },
      editFoodEntryObj: []
    };
  }

  openModal = item => {
    this.setState({
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  passFoodEntryData = async entry => {
    const client = new ApolloClient({
      uri: "http://localhost:4000"
    });
    try {
      const foodquery = await client.query({
        query: GET_FOOD_BY_ID,
        variables: {
          foodId: entry.food_id.id
        }
      });
      if (foodquery.data.getFoodById.edamam_id) {
        this.setState({
          edamamExist: true,
        });
      } else {
        this.setState({
          edamamExist: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
    await this.props.passFoodData(entry);
    await this.openModal();
  };

  deleteFood = id => {
    this.props.deleteFoodEntry(id);
    this.closeModal();
  };

  editFood = entry => {
    this.props.editFoodEntry(entry.id, entry);
    this.closeModal();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.foodEntries !== this.props.foodEntries) {
      this.setState({
        foodEntries: this.props.foodEntries,
        foodEntry: this.props.foodEntry
      });
    }
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "http://localhost:4000",
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
  };

  render() {
    console.log("edamamExist!!", this.state.edamamExist)
    console.log("regular props", this.props)
    const { classes } = this.props;
    const dateToday = new Date();
    const month = dateToday.getMonth();
    const day = dateToday.getDate();
    const year = dateToday.getFullYear();
    let foodEntries = this.props.foodEntries;
    console.log("food entry...", this.props.foodEntry)
    foodEntries = foodEntries.filter(entry => {
      const dateEntry = new Date(entry.date);
      const entryMonth = dateEntry.getMonth();
      const entryDay = dateEntry.getDate();
      const entryYear = dateEntry.getFullYear();
      return entryMonth === month && entryDay === day && entryYear === year;
    });

    const Breakfast = foodEntries.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Breakfast";
    });

    const Lunch = foodEntries.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Lunch";
    });

    const Dinner = foodEntries.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Dinner";
    });

    const Snack = foodEntries.filter(entry => {
      return entry.meal_category_id.mealCategoryName === "Snack";
    });
    return (
      <div className={classes.root}>
        <FoodEntryContainer>
          <div>
            <CardContent className={classes.mealCon}>
              <CardContent className={classes.mealCard}>
                <Typography className={classes.mealTitle} variant="h4">
                  Breakfast
                </Typography>
                <hr />
                {Breakfast.map(entry => (
                  <div
                    key={entry.id}
                    onClick={() => this.passFoodEntryData(entry)}
                  >
                    <div entry={entry}>
                      <span className="bullet">&#8226;</span>{" "}
                      {entry.food_id.foodName}
                    </div>
                  </div>
                ))}
              </CardContent>

              <CardContent className={classes.mealCard}>
                <Typography className={classes.mealTitle} variant="h4">
                  Lunch
                </Typography>
                <hr />
                {Lunch.map(entry => (
                  <div onClick={this.openModal}>
                    <div
                      key={entry.id}
                      onClick={() => this.passFoodEntryData(entry)}
                    >
                      <div>
                        <span className="bullet">&#8226;</span>{" "}
                        {entry.food_id.foodName}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardContent className={classes.mealCard}>
                <Typography className={classes.mealTitle} variant="h4">
                  Dinner
                </Typography>
                <hr />
                {Dinner.map(entry => (
                  <div key={entry.id} onClick={this.openModal}>
                    <div onClick={() => this.passFoodEntryData(entry)}>
                      <div>
                        <span className="bullet">&#8226;</span>{" "}
                        {entry.food_id.foodName}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardContent className={classes.mealCard}>
                <Typography className={classes.mealTitle} variant="h4">
                  Snack
                </Typography>
                <hr />
                {Snack.map(entry => (
                  <div key={entry.id} onClick={this.openModal}>
                    <div onClick={() => this.passFoodEntryData(entry)}>
                      <div>
                        <span className="bullet">&#8226;</span>{" "}
                        {entry.food_id.foodName}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

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
                              <span className={classes.title}>
                                {" "}
                                Edit Food Entry
                              </span>
                            </DialogTitle>
                <DialogContent classes={{ root: classes.dialogBox }} dividers>
                  <DialogContentText classes={{ root: classes.food }}>
                    <span className={classes.food}>
                      {this.props.foodEntry &&
                        this.props.foodEntry.food_id &&
                        this.props.foodEntry.meal_category_id && (
                          <div className={classes.entryContainer}>

                            {this.state.edamamExist && (
                            <>
                              <TextField
                                disabled
                                id="standard-disabled"
                                className={classes.food}
                                value={this.props.foodEntry.food_id.foodName}
                                aria-describedby="errorFood-text"
                              />
                            </>
                            )}
                        {!this.state.edamamExist && (
                            <>
                              <TextField
                                required
                                error={this.state.errorMsg.errorFood}
                                autoFocus
                                margin="dense"
                                className={classes.food}
                                type="text"
                                name="foodName"
                                onChange={this.props.onFoodEntryChange}
                                value={this.props.foodEntry.food_id.foodName}
                                aria-describedby="errorFood-text"
                              />
                            </>
                            )}
                           <TextField
                              label="Date"
                              className="form-field"
                              type="date"
                              name="date"
                              error={this.state.errorMsg.errorDate}
                              onChange={this.props.onFoodEntryChange}
                              required
                              aria-describedby="errorDate-text"
                              value={moment(this.props.foodEntry.date).format(
                                "YYYY-MM-DD"
                              )}
                              defaultValue={moment(
                                this.props.foodEntry.date
                              ).format("YYYY-MM-DD")}
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
                             <FormHelperText id="errorDate-text">
                              {this.state.errorMsg.errorDate}
                            </FormHelperText>
                            <TextField
                              autoFocus
                              margin="dense"
                              error={this.state.errorMsg.errorQty}
                              label="Serving Quantity"
                              className="form-field"
                              type="number"
                              name="servingQty"
                              onChange={this.props.onFoodEntryChange}
                              value={this.props.foodEntry.servingQty}
                              required
                              aria-describedby="errorQty-text"
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
                              name="caloriesPerServ"
                              defaultValue={ this.props.foodEntry.food_id.caloriesPerServ}
                            />
                            <FormHelperText id="errorCal-text">
                              {this.state.errorMsg.errorCal}
                            </FormHelperText>
                            <TextField
                              disabled
                              id="standard-disabled"
                              label="Grams of Protein per Serving"
                              name="proteins"
                              defaultValue={this.props.foodEntry.food_id.proteins}
                            />
                            <FormHelperText id="errorProteins-text">
                              {this.state.errorMsg.errorProteins}
                            </FormHelperText>
                            <TextField
                              disabled
                              id="standard-disabled"
                              label="Grams of Carbs per Serving"
                              name="carbs"
                              defaultValue={this.props.foodEntry.food_id.carbs}
                            />
                            <FormHelperText id="errorCarbs-text">
                              {this.state.errorMsg.errorCarbs}
                            </FormHelperText>
                            <TextField
                              disabled
                              id="standard-disabled"
                              label="Grams of Fat per Serving"
                              name="fats"
                              defaultValue={this.props.foodEntry.food_id.fats}
                            />
                            <FormHelperText id="errorFats-text">
                              {this.state.errorMsg.errorFats}
                            </FormHelperText>
                            </>
                          )}
                          {!this.state.edamamExist && (
                            <>
                            <TextField
                              required
                              error={this.state.errorMsg.errorFood}
                              autoFocus
                              margin="dense"
                              label="Calories Per Serving"
                              className="form-field"
                              type="number"
                              placeholder="Add food here..."
                              name="caloriesPerServ"
                              onChange={this.props.onFoodEntryChange}
                              value={
                                this.props.foodEntry.food_id.caloriesPerServ
                              }
                              aria-describedby="errorCal-text"
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
                            <FormHelperText id="errorCal-text">
                              {this.state.errorMsg.errorCal}
                            </FormHelperText>
                            <TextField
                            required
                              autoFocus
                              margin="dense"
                              label="Grams of Protein per Serving"
                              className="form-field"
                              type="number"
                              name="proteins"
                              error={this.state.errorMsg.errorProteins}
                              onChange={this.props.onFoodEntryChange}
                              value={this.props.foodEntry.food_id.proteins}
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
                              aria-describedby="errorProteins-text"
                            />
                            <FormHelperText id="errorProteins-text">
                              {this.state.errorMsg.errorProteins}
                            </FormHelperText>
                            <TextField
                              label="Grams of Carbs per Serving"
                              className="form-field"
                              type="number"
                              name="carbs"
                              error={this.state.errorMsg.errorCarbs}
                              onChange={this.props.onFoodEntryChange}
                              value={this.props.foodEntry.food_id.carbs}
                              required
                              aria-describedby="errorCarbs-text"
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
                            <FormHelperText id="errorCarbs-text">
                              {this.state.errorMsg.errorCarbs}
                            </FormHelperText>
                            <TextField
                              label="Grams of Fat per Serving"
                              className="form-field"
                              type="number"
                              name="fats"
                              error={this.state.errorMsg.errorFats}
                              onChange={this.props.onFoodEntryChange}
                              value={this.props.foodEntry.food_id.fats}
                              required
                              aria-describedby="errorFats-text"
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
                            <FormHelperText id="errorFats-text">
                              {this.state.errorMsg.errorFats}
                            </FormHelperText>
                            </>
                          )}
                            <InputLabel htmlFor="meal-simple" className={classes.label}>
                              Meal Category
                            </InputLabel>
                            <Select
                              autoFocus
                              margin="dense"
                              error={this.state.errorMsg.errorCategory}
                              // label="Meal Category"
                              required
                              // className="form-field"
                              // name="meal_category_id"
                              type="number"
                              value={this.props.foodEntry.meal_category_id.id ? this.props.foodEntry.meal_category_id.id  : this.props.foodEntry.meal_category_id} 
                              onChange={this.props.onFoodEntryChange}
                              aria-describedby="errorCategory-text"
                              inputProps={{
                                name: "meal_category_id",
                                id: "meal-simple"
                              }}
                              className={classes.category}
                            >
                              <MenuItem>
                                Select Meal Category
                              </MenuItem>
                              <MenuItem value="1">breakfast</MenuItem>
                              <MenuItem value="2">lunch</MenuItem>
                              <MenuItem value="4">dinner</MenuItem>
                              <MenuItem value="3">snack</MenuItem>
                            </Select>
                          </div>
                        )}
                    </span>
                  </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.buttons}>
                  <Button onClick={this.closeModal} className={classes.btn}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => this.editFood(this.props.foodEntry)}
                    className={classes.btn}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => this.deleteFood(this.props.foodEntry.id)}
                    className={classes.del}
                  >
                    Delete
                  </Button>
                </DialogActions>
             </Dialog> 
            </CardContent>
          </div>
        </FoodEntryContainer>
      </div>
    );
  }
}

export default withStyles(styles)(FoodEntry);
