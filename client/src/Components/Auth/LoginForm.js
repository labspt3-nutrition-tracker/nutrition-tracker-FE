import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            userType: "",
            calorieGoal:0,
            weight:0
        }
    }

    bundleUserInfo = e => {
        e.preventDefault()
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            userType: this.state.userType,
            calorieGoal: this.state.calorieGoal,
            weight: this.state.weight
        }

        this.props.addUser(user)
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.props.handleChange(e.target.name, e.target.value)
    }
    render(){
        return (
            <div>
                {this.props.addUser ? (
                    <div>
                        <h1>Sign Up</h1>
                        <form onSubmit={this.bundleUserInfo}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="firstName"
                                value={this.state.firstName}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="lastName"
                                value={this.state.lastName}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="username"
                                name="username"
                                label="username"
                                value={this.state.username}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="email"
                                name="email"
                                label="email"
                                value={this.state.email}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="userType"
                                name="userType"
                                label="userType"
                                value={this.state.userType}
                                margin="dense"
                                onChange={this.handleChange}
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}

            </div>
        )
    }

}

export default LoginForm;