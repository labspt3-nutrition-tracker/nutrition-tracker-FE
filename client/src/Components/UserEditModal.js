import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { addWeightEntry } from "../util/addWeightEntry";
import { updateUserData } from "../util/updateUserData";

class UserEditModal extends Component {
  state = {
    editInput: ""
  };

  handleInput = event => {
    this.setState({ editInput: event.target.value });
  };

  handleEdit = editType => {
    console.log({ editType });
    console.log("new value: ", this.state.editInput);
    if (editType === "userType") {
      this.props.handleClose();
      this.props.history.push("/billing-plan");
    } else if (editType === "weight") {
      const input = {
        date: Date.now(),
        weight: Number(this.state.editInput),
        user_id: Number(this.props.currentUser.id)
      };
      addWeightEntry(input)
        .then(entry => {
          this.setState({ editInput: "" });
          this.props.history.push("/settings");
        })
        .catch(err => console.log(err));
    } else if (editType === "caloriesGoal") {
      const newGoal = this.state.editInput.trim() ? Number(this.state.editInput) : this.props.currentUser.calorieGoal;
      const { firstName, lastName, username, email, userType, weight } = this.props.currentUser;
      const newUser = {
        firstName,
        lastName,
        username,
        email,
        userType,
        weight,
        calorieGoal: newGoal
      };
      updateUserData(Number(this.props.currentUser.id), newUser)
        .then(id => {
          this.setState({ editInput: "" });
          this.props.history.push("/settings");
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { open, handleClose, editType, currentUser, currentWeight } = this.props;
    let label;
    let message;
    if (editType === "weight") {
      message = "Your current weight is " + currentWeight + ". Do you want to update it?";
      label = "Current Weight";
    } else if (editType === "caloriesGoal") {
      message = "Current daily calories goal is " + currentUser.calorieGoal + ". What is your new daily calories goal?";
      label = "Calories Goal";
    } else if (editType === "userType") {
      message = "Please update to Premium";
    }
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Update Your Data</DialogTitle>
        <DialogContent>
          {message && <DialogContentText>{message}</DialogContentText>}
          {label && (
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label={label}
              type='email'
              fullWidth
              onChange={this.handleInput}
              value={this.state.editInput}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.handleEdit(editType);
              handleClose();
            }}
            color='secondary'
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withRouter(UserEditModal);
