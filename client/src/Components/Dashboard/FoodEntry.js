import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { GET_CURRENT_USERID } from "../../graphql/queries";

const FoodEntryContainer = styled.div`
  width: 50%;
`;

const MealCategory = styled.h3`
  font-size: 2rem;
  font-weight: bold;
`;

const Meal = styled.div`
  padding: 10px;
`;

const ModalButton = styled.button`
  color: #fcfcfb;
  background: #f4b4c3;
  margin-bottom: 5px;
  padding: 5px 15px;
  font-size: 0.9em;
`;

const FoodModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10% 20%;
  padding: 10%;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
`;

// const customStyles = {
//   content : {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     height: "50%",
//     width: "50%",
//     transform: "translate(-50%, -50%)",
//     position: "absolute"
//   }
// };

Modal.setAppElement("#root");

const styles = theme => ({
  title: {
    // flexGrow: 1,
    fontSize: 16,
    background: "#2C363F",
    padding: 10,
    color: "#ffffff",
  },
})

class FoodEntry extends React.Component {
  state = {
    currentUser: null,
    foodEntries: [],
    showModal: false
  };

  openModal = item => {
    console.log("modal open");
    this.setState({
      showModal: true,
      foodEntries: item.id
    });
  };

  closeModal = () => {
    console.log("modal closed");
    this.setState({ showModal: false });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.foodEntries !== this.props.foodEntries) {
      this.setState({ foodEntries: this.props.foodEntries });
    }
  }

  // componentDidUpdate(prevProps, prevState){
  //   const idToken = localStorage.getItem("token");
  //   this.getCurrentUser(idToken);
  //   const ENTRIES_QUERY = gql`
  //   query getFoodEntriesByUserId{
  //     getFoodEntriesByUserId(userId: ${this.state.currentUser}) {
  //       date
  //       food_id {
  //         id
  //         foodName
  //       }
  //       meal_category_id {
  //         id
  //         mealCategoryName
  //       }
  //     }
  //   }
  // `;
  //   console.log("componentdidMount prevProps", prevProps)
  //   console.log("componentdidMount prevState", prevState)
  // }

  getCurrentUser = idToken => {
    // const client = new ApolloClient({
    //   uri: "https://nutrition-tracker-be.herokuapp.com",
    //   headers: { authorization: idToken }
    // });
    // client
    //   .query({
    //     query: GET_CURRENT_USERID
    //   })
    //   .then(response => {
    //     this.setState({ currentUser: response.data.getCurrentUser.id });
    //     console.log(this.state.currentUser);
    //   })
    //   .catch(err => console.log(err));
  };

  render() {
    // console.log(this.props.foodEntries);

    // let viewItem = this.props.item.map( item => {
    //   return ()
    // })
    // let foodId = this.props.foodEntries.match.params.food_id;
    // console.log('foodId', foodId)
    // let theFoodId = this.props.match.params.id;
    // console.log('theFoodId', theFoodId)
    // this.getCurrentUser(localStorage.getItem("token"))
    // const ENTRIES_QUERY = gql`
    //   query getFoodEntriesByUserId{
    //     getFoodEntriesByUserId(userId: ${this.state.currentUser}) {
    //       date
    //       food_id {
    //         id
    //         foodName
    //       }
    //       meal_category_id {
    //         id
    //         mealCategoryName
    //       }
    //     }
    //   }
    // `;
    const { classes } = this.props;
    const dateToday = new Date();
    const month = dateToday.getMonth();
    const day = dateToday.getDate();
    const year = dateToday.getFullYear();
    let foodEntries = this.props.foodEntries;

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
      <FoodEntryContainer>
        <div>
          <CardContent>
            <Typography className={classes.title}>Today's Summary:</Typography>
          </CardContent>

          {/* {({ loading, error, data }) => {
              if (loading) return <div>Fetching Entries</div>;

              if (error) return <div>Error</div>; */}

          {/* const dateToday = new Date();
              const month = dateToday.getMonth();
              const day = dateToday.getDate();
              const year = dateToday.getFullYear();
              let foodEntries = this.props.foodEntries;

              foodEntries = foodEntries.filter(entry => {
                const dateEntry = new Date(entry.date);
                const entryMonth = dateEntry.getMonth();
                const entryDay = dateEntry.getDate();
                const entryYear = dateEntry.getFullYear();
                return (
                  entryMonth === month && entryDay === day && entryYear === year
                );
              });

              const Breakfast = foodEntries.filter(function(entry) {
                return entry.meal_category_id.mealCategoryName === "Breakfast";
              });

              const Lunch = foodEntries.filter(function(entry) {
                return entry.meal_category_id.mealCategoryName === "Lunch";
              });

              const Dinner = foodEntries.filter(function(entry) {
                return entry.meal_category_id.mealCategoryName === "Dinner";
              });

              const Snack = foodEntries.filter(function(entry) {
                return entry.meal_category_id.mealCategoryName === "Snack";
              }); */}

          {/* return ( */}
          <div>
            <Meal>
              <MealCategory>Breakfast</MealCategory>
              {Breakfast.map(entry => (
                <div onClick={this.openModal}>
                  <div type="submit" onClick={this.openModal}>
                    <div key={entry.id}>{entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </Meal>

            <Meal>
              <MealCategory>Lunch</MealCategory>
              {Lunch.map(entry => (
                <div onClick={this.openModal}>
                  <div type="submit" onClick={this.openModal}>
                    <div key={entry.id}>{entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </Meal>
            <Meal>
              <MealCategory>Dinner</MealCategory>
              {Dinner.map(entry => (
                <div onClick={this.openModal}>
                  <div type="submit" onClick={this.openModal}>
                    <div key={entry.id}>{entry.food_id.foodName}</div>
                  </div>
                </div>
              ))}
            </Meal>
            <Meal>
              <MealCategory>Snack</MealCategory>
              {Snack.map(entry => (
                <div onClick={this.openModal}>
                  <div type="submit" onClick={this.openModal}>
                    <div key={entry.id}>{entry.food_id.foodName}</div>
                    {/* <div type="submit" onClick={this.openModal}>edit</div> */}
                  </div>
                </div>
              ))}
            </Meal>
            <FoodModal
              isOpen={this.state.showModal}
              itemOpen={this.state.foodEntries}
            >
              In the modal
              <ModalButton onClick={this.closeModal}>No?</ModalButton>
            </FoodModal>
          </div>
        </div>
      </FoodEntryContainer>
    );
  }
}

export default withStyles(styles)(FoodEntry);
