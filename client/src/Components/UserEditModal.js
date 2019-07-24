import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

import { addWeightEntry } from "../util/addWeightEntry";
import { updateUserData } from "../util/updateUserData";

const styles = theme => ({
  title: {
    fontFamily: "Oswald",
    fontSize: "3rem",
    color: "#5E366A"
  },
  message: {
    fontFamily: "Roboto",
    fontSize: "1.7rem",
    color: "black"
  },
  formTextLabel: {
    fontFamily: "Roboto",
    fontSize: "1.5rem",
    color: "#5E366A"
  },
  formTextInput: {
    fontFamily: "Roboto",
    fontSize: "1.5rem"
  },
  btn: {
    fontFamily: "Roboto",
    fontSize: "1.6rem",
    color: "#5E366A"
  },
  errors: {
    fontSize: "1.5rem"
  }
});

class UserEditModal extends Component {
  state = {
    editInput: "",
    errorText: "",
    error: false
  };

  handleInput = event => {
    this.setState({ editInput: event.target.value });
  };

  handleCancel = () => {
    this.setState({ editInput: "", errorText: "", error: false });
  };

  handleEdit = editType => {
    console.log({ editType });
    console.log("new value: ", this.state.editInput);
    if (editType === "userType") {
      this.props.handleClose();
      this.props.history.push("/billing");
    } else {
      if (!this.state.editInput.trim()) {
        this.setState({ errorText: "Please provide a value", error: true });
      } else if (!Number(this.state.editInput)) {
        this.setState({
          errorText: "Please provide a number value",
          error: true
        });
      } else {
        if (editType === "weight") {
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
          const newGoal = this.state.editInput.trim()
            ? Number(this.state.editInput)
            : this.props.currentUser.calorieGoal;
          const {
            firstName,
            lastName,
            email,
            userType,
            weight
          } = this.props.currentUser;
          const newUser = {
            firstName,
            lastName,
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
        this.setState({ errorText: "", error: false, editInput: "" });
        this.props.handleClose();
      }
    }
  };

  render() {
    const {
      classes,
      open,
      handleClose,
      editType,
      currentUser,
      currentWeight
    } = this.props;
    let label;
    let message;
    if (editType === "weight") {
      message =
        "Your current weight is " +
        currentWeight +
        ". Do you want to update it?";
      label = "Current Weight";
    } else if (editType === "caloriesGoal") {
      message =
        "Current daily calories goal is " +
        currentUser.calorieGoal +
        ". What is your new daily calories goal?";
      label = "Calories Goal";
    } else if (editType === "userType") {
      message =
        currentUser.userType === "basic"
          ? "Please upgrade to Premium"
          : "Please upgrade to coach";
    }
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            minHeight: "25vh",
            minWidth: "30vw"
          }
        }}
      >
        <DialogTitle id="form-dialog-title">
          <span className={classes.title}>
            {" "}
            {editType === "userType"
              ? "Upgrade your account"
              : "Update Your Data"}
          </span>
        </DialogTitle>
        <DialogContent>
          {message && (
            <DialogContentText>
              <span className={classes.message}>{message}</span>
            </DialogContentText>
          )}
          {label && (
            <TextField
              required
              error={this.state.error}
              helperText={this.state.errorText}
              autoFocus
              margin="dense"
              id="name"
              label={label}
              type="email"
              fullWidth
              onChange={this.handleInput}
              value={this.state.editInput}
              InputLabelProps={{
                classes: {
                  root: classes.formTextLabel
                }
              }}
              InputProps={{
                classes: {
                  input: classes.formTextInput
                }
              }}
              FormHelperTextProps={{
                classes: {
                  error: classes.errors
                }
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.handleCancel();
              handleClose();
            }}
            color="primary"
            className={classes.btn}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              this.handleEdit(editType);
              // handleClose();
            }}
            color="secondary"
            className={classes.btn}
          >
            {editType === "userType" ? "Upgrade" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(withRouter(UserEditModal));
