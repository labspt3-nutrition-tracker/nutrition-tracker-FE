import React, { useState } from "react";
import * as moment from "moment";
import { Document, Page, Text, View, Font, StyleSheet } from "@react-pdf/renderer";

import { getLastXDays } from "../../../util/getLastXDays";
import { filterByDays } from "../../../util/filterByDays";
import { getTotalData } from "../../../util/getTotalData";
import { getExercises } from "../../../util/getExercises";
import List, { Item } from "./List";

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignContent: "apace-between"
  },
  info: {
    width: "40%",
    margin: "10px 20px"
  },
  title: {
    margin: 20,
    fontSize: 25,
    textAlign: "center",
    color: "#3685B5",
    textTransform: "uppercase"
  },
  subTitle: {
    textAlign: "center",
    color: "#3685B5",
    textTransform: "uppercase",
    marginBottom: 20,
    fontSize: 20
  },
  category: {
    marginBottom: 10,
    marginTop: 20,
    color: "#3685B5"
  },
  hr: {
    color: "#F4B4C3"
  },
  date: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10
  }
});

const PDFReport = props => {
  const { currentUser, foodEntries, exerciseEntries } = props;
  const [days, setDays] = useState(getLastXDays(7));
  const [foods, setFoods] = useState(filterByDays(foodEntries, days, "date"));
  const [totalCal, setTotalCal] = useState(getTotalData(foodEntries, "caloriesPerServ", days));
  const [exercises, setExercises] = useState(filterByDays(exerciseEntries, days, "exerciseEntryDate"));
  const [totalExer, setTotalExer] = useState(getExercises(exerciseEntries, days));
  return (
    <>
      <Document>
        <Page size='A4'>
          <View>
            <Text style={styles.title}>
              Last 7 days: {moment(days[0]).format("MM/DD")} - {moment(days[6]).format("MM/DD")}
            </Text>
            {currentUser && (
              <Text style={styles.subTitle}>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
            )}
          </View>
          <View style={styles.body}>
            <View style={styles.info}>
              <Text style={styles.category}>Food Entries</Text>
              <List>
                {foods.map((food, i) => (
                  <>
                    {food.length > 0 && (
                      <>
                        <Text style={styles.date}>-- {food[0].date}: </Text>
                        <List>
                          {food.map((entry, j) => (
                            <Item key={j}>
                              {entry.servingQty} {entry.food_id.foodName} for {entry.meal_category_id.mealCategoryName}
                            </Item>
                          ))}
                        </List>
                        <Text style={styles.date}>Total Calories: {totalCal[i]} kcal.</Text>
                        <Text style={styles.hr}>---------------------------------------</Text>
                      </>
                    )}
                  </>
                ))}
              </List>
            </View>
            {currentUser.userType !== "basic" && (
              <View style={styles.info}>
                <Text style={styles.category}>Exercise Entries</Text>
                <List>
                  {exercises.map((exercise, i) => (
                    <>
                      {exercise.length > 0 && (
                        <>
                          <Text style={styles.date}>-- {exercise[0].exerciseEntryDate}: </Text>
                          <List key={i}>
                            {exercise.map((entry, j) => (
                              <Item key={j}>
                                {entry.exerciseName}, burned {entry.caloriesBurned}
                              </Item>
                            ))}
                          </List>
                          <Text style={styles.date}>Total Calories: {totalExer[i]} kcal.</Text>
                          <Text style={styles.hr}>---------------------------------------</Text>
                        </>
                      )}
                    </>
                  ))}
                </List>
              </View>
            )}
          </View>
        </Page>
      </Document>
    </>
  );
  // }
};

export default PDFReport;
