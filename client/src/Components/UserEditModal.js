import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    this.setState({ editInput: "" });
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

export default UserEditModal;
