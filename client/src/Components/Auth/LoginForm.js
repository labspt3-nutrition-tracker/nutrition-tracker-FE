import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      calorieGoal: 0,
      weight: 0
    };
  }

  bundleUserInfo = e => {
    e.preventDefault();
    const userInfo = {
      username: this.state.username,
      calorieGoal: Number(this.state.calorieGoal),
      weight: Number(this.state.weight)
    };

    this.props.addUser(userInfo);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div>
        {this.props.addUser ? (
          <div>
            <h1>Sign Up</h1>
            <form onSubmit={this.bundleUserInfo}>
              <TextField
                id='username'
                name='username'
                label='username'
                value={this.state.username}
                margin='dense'
                onChange={this.handleChange}
              />
              <TextField
                id='calorieGoal'
                name='calorieGoal'
                label='Daily Calories Goal'
                value={this.state.calorieGoal}
                margin='dense'
                onChange={this.handleChange}
              />
              <TextField
                id='weight'
                name='weight'
                label='Current Weight'
                value={this.state.weight}
                margin='dense'
                onChange={this.handleChange}
              />
              <Button variant='contained' color='primary' type='submit'>
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default LoginForm;
