import React, { Component } from "react";
import Header from "../Reusables/Header";
import Calories from "./Calories";
import EntryForm from "./EntryForm";
import FoodEntry from "./FoodEntry";

class Dashboard extends Component {
  state = {
    newFoodEntry: {
      food: "",
      date: "",
      servingQty: 0,
      category: ""
    },
    currentFoodEntries: {
      breakfast: [
        {
          food: "apple",
          date: "2019-05-14",
          servingQty: 1,
          calories: 50
        }
      ],

      lunch: [
        {
          food: "chicken nuggets",
          date: "2019-05-14",
          servingQty: 1,
          calories: 200
        },
        {
          food: "side salad",
          date: "2019-05-14",
          servingQty: 1,
          calories: 100
        }
      ],
      dinner: [
        {
          food: "spaghetti and meatballs",
          date: "2019-05-14",
          servingQty: 2,
          calories: 1000
        },
        {
          food: "garlic bread",
          date: "2019-05-14",
          servingQty: 1,
          calories: 75
        }
      ],
      snacks: [
        {
          food: "cheeseballs",
          date: "2019-05-14",
          servingQty: 5,
          calories: 500
        },
        {
          food: "banana",
          date: "2019-05-14",
          servingQty: 1,
          calories: 50
        }
      ]
    }
  };

  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <Header />
          <div className="dash-title">Today's Food Entries</div>
          <FoodEntry entries={this.state.currentFoodEntries} />
          <EntryForm />
          <Calories />
        </div>
      </div>
    );
  }
}

export default Dashboard;
