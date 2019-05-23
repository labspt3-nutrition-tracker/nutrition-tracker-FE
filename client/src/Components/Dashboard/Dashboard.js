import React, { Component } from "react";
import Header from "../Reusables/Header";
import Calories from "./Calories";
import EntryForm from "./EntryForm";
import FoodEntry from "./FoodEntry";
import styled from "styled-components";

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
          <DashTitle>Today's Food Entries</DashTitle>
          <hr />
          <Calories />
          <InfoCon>
            <FoodEntry entries={this.state.currentFoodEntries} />
            <EntryForm />
          </InfoCon>
        </div>
      </div>
    );
  }
}

const DashTitle = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const InfoCon = styled.div`
  display: flex;
  justify-content: center;
`;
export default Dashboard;
