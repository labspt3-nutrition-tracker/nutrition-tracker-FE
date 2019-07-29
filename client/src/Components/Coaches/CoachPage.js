import React from "react";
import ApolloClient from "apollo-boost";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import TraineeList from "./TraineeList";
import TraineeResult from "./TraineeResult";
import TraineeSearch from "./TraineeSearch";
import TraineeInfo from "./TraineeInfo";
import SendMessageFromCoach from "./SendMessage";
import {
  SEARCH_USER_BY_EMAIL,
  GET_CURRENT_USER_QUERY,
  GET_TRAINEES
} from "../../graphql/queries";
import { ADD_MESSAGE_MUTATION, DELETE_TRAINEE } from "../../graphql/mutations";

const styles = theme => ({
  root: {
    margin: "auto",
    marginTop: 20,
    padding: 15,
    fontFamily: "Oswald",
    maxWidth: "1200px"
  },
  message: {
    fontSize: "2rem",
    textAlign: "center",
    margin: 10,
    color: "#40a798",
    fontFamily: "Oswald"
  }
});

class CoachPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      traineeSearchInput: "",
      traineeSearchResults: null,
      traineeExist: false,
      isSearchModalOpen: false,
      trainees: [],
      selectedTrainee: [],
      noUserFoundError: "",
      errorText: "",
      error: false,
      info: ""
    };
  }

  updateTraineeSearch = e => {
    this.setState({
      traineeSearchInput: e.target.value,
      info: "",
      errorText: ""
    });
  };

  handleChooseUser = async user => {
    await this.setState({
      selectedTrainee: user,
      info: "",
      errorText: ""
    });
  };

  componentDidMount() {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com/",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USER_QUERY
      })
      .then(response => {
        this.setState({
          currentUser: response.data.getCurrentUser,
          errorText: ""
        });
        client
          .query({
            query: GET_TRAINEES,
            variables: {
              coach_id: this.state.currentUser.id
            }
          })
          .then(response => {
            this.setState({
              trainees: response.data.getTrainees
            });
          });
      })
      .catch(err => {
        this.setState({
          errorText: err.message.split(":")[1]
        });
      });
  }

  getUserData = email => {
    email = this.state.traineeSearchInput;
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com/",
      headers: { authorization: idToken }
    });
    client
      .query({
        query: SEARCH_USER_BY_EMAIL,
        variables: {
          param: "email",
          value: email
        }
      })
      .then(response => {
        this.setState({
          traineeSearchResults: response.data.getUserBy,
          isSearchModalOpen: true,
          noUserFoundError: "",
          traineeSearchInput: "",
          info: "",
          errorText: ""
        });
      })
      .catch(error => {
        this.setState({
          traineeSearchInput: "",
          traineeSearchResults: null,
          isSearchModalOpen: true,
          noUserFoundError: "No user by that email found"
        });
      });
  };

  deleteTrainee = async traineeId => {
    const idToken = localStorage.getItem("token");
    const userId = this.state.currentUser.id;
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com/",
      headers: { authorization: idToken }
    });

    try {
      await client.mutate({
        mutation: DELETE_TRAINEE,
        variables: { coach_id: userId, trainee_id: traineeId }
      });
      const trainees = await client.query({
        query: GET_TRAINEES,
        variables: {
          coach_id: userId
        }
      });
      this.setState({
        trainees: trainees.data.getTrainees,
        info: "Trainee has been deleted successfully.",
        errorText: ""
      });
    } catch (err) {
      this.setState({
        errorText: "Unable to delete your trainee"
      });
    }
  };

  traineeExistCheck = async (coachId, traineeId) => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com/",
      headers: { authorization: idToken }
    });

    const trainees = await client.query({
      query: GET_TRAINEES,
      variables: {
        coach_id: coachId
      }
    });

    const filteredTrainees = trainees.data.getTrainees.some(trainee => {
      return trainee.id === traineeId;
    });

    if (filteredTrainees === true) {
      this.setState({
        traineeExist: true
      });
    } else {
      this.setState({
        traineeExist: false
      });
    }
  };

  handleRequest = async () => {
    const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com/",
      headers: { authorization: idToken }
    });
    const userId = this.state.currentUser.id;
    const name = `${this.state.currentUser.firstName} ${
      this.state.currentUser.lastName
    }`;
    const variables = {
      input: {
        type: "alert",
        text: `This is a request from ${name} to follow your nutrition.`,
        read: false,
        sender: userId,
        recipient: this.state.traineeSearchResults.id
      }
    };
    await this.traineeExistCheck(userId, this.state.traineeSearchResults.id);

    if (this.state.traineeExist) {
      console.log("user exist already");
      this.setState({
        traineeSearchResults: null,
        errorText: `User ${this.state.traineeSearchResults.firstName} ${
          this.state.traineeSearchResults.lastName
        } has already been added`
      });
    } else {
      try {
        await client.mutate({ mutation: ADD_MESSAGE_MUTATION, variables });
        this.setState({
          traineeSearchResults: null,
          info: `A request message has been sent to ${
            this.state.traineeSearchResults.firstName
          } ${this.state.traineeSearchResults.lastName}.`,
          errorText: ""
        });
      } catch (err) {
        this.setState({
          errorText: "Unable to send SendMessage"
        });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { info, errorText } = this.state;
    return (
      <>
        {info && <h2 className={classes.message}>{info}</h2>}
        {errorText && <h2 className={classes.message}>{errorText}</h2>}
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item sm={5} xs={12}>
            <TraineeSearch
              traineeSearchInput={this.state.traineeSearchInput}
              updateTraineeSearch={this.updateTraineeSearch}
              getUserData={this.getUserData}
            />
          </Grid>
          <Grid item sm={7} xs={12}>
            <TraineeResult
              traineeSearchResults={this.state.traineeSearchResults}
              noUserFoundError={this.state.noUserFoundError}
              request={this.handleRequest}
              currentUser={this.state.currentUser}
              trainees={this.state.trainees}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TraineeList
              trainees={this.state.trainees}
              deleteTrainee={this.deleteTrainee}
              handleChooseUser={this.handleChooseUser}
              traineeID={this.state.selectedTrainee.id}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <SendMessageFromCoach
              traineeID={this.state.selectedTrainee.id}
              firstName={this.state.selectedTrainee.firstName}
              lastName={this.state.selectedTrainee.lastName}
              currentUser={this.state.currentUser}
            />
          </Grid>
          <Grid item xs={12}>
            <TraineeInfo traineeID={this.state.selectedTrainee.id} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(CoachPage);
