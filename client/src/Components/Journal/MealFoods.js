import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  root: {
    marginBottom: 20
  },
  categoryList: {
    alignItems: "flex-start"
  },
  mealCategory: {
    color: "#60B5A9",
    fontSize: "1.8rem",
    fontFamily: "Oswald"
  },
  list: {
    width: "70%"
  },
  foodEntry: {
    fontSize: "1.8rem",
    paddingLeft: "10px",
    fontFamily: "Oswald"
  }
});

const MealFoods = props => {
  const { classes, category, foods, passMealData } = props;

  return (
    <ListItem classes={{ root: classes.categoryList }}>
      <ListItemText
        primary={category}
        classes={{ primary: classes.mealCategory }}
      />
      <List
        component="div"
        disablePadding
        dense
        classes={{ root: classes.list }}
      >
        {foods.length > 0 ? (
          foods.map(food => {
            {
              /* console.log({ food }); */
            }
            return (
              <Fragment key={food.id}>
                <ListItem button onClick={() => passMealData(food)}>
                  <ListItemText
                    primary={food.food_id.foodName}
                    classes={{ primary: classes.foodEntry }}
                  />
                </ListItem>
              </Fragment>
            );
          })
        ) : (
          <ListItem>
            <ListItemText
              primary={`No ${category} entries`}
              classes={{ primary: classes.foodEntry }}
            />
          </ListItem>
        )}
      </List>
    </ListItem>
  );
};

export default withStyles(styles)(MealFoods);
