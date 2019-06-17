import React from "react";
import Modal from 'react-modal';
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { GET_CURRENT_USERID } from "../../graphql/queries";
import { DELETE_EXERENTRY } from '../../graphql/mutations';

const ExerciseActivity = styled.div`
  padding: 10px;
`;

const ExerciseEntry = styled.div`

`;

const ExerciseModal = styled(Modal)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 10% 20%;
padding: 10%;
border: 1px solid black;
border-radius: 5px;
background-color: white;
`;

class ExerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      exerEntries: [],
      showModal: false,
      exerEntry: []
    };
  }

  openModal = () => {
    this.setState({
      showModal: true
    })
  }

  passExerData = (entry) => {
    this.setState({
      exerEntry: entry

    })
    this.openModal()
  }

  deleteExerEntry = (id, idToken) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .mutate({
        mutation: DELETE_EXERENTRY,
        variables: {id}
      })
      .then(response => {
        this.setState({
          exerEntry: null
         });
         this.closeModal()
        console.log(this.state.exerEntry);
      })
      .catch(err => console.log(err));
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: GET_CURRENT_USERID
      })
      .then(response => {
        this.setState({ currentUser: response.data.getCurrentUser.id });
        console.log(this.state.currentUser);
      })
      .catch(err => console.log(err));
  };

  closeModal = () => {
    console.log('modal closed')
    this.setState({ showModal: false})
  }
  // componentDidMount = () => {
  //   const idToken = localStorage.getItem("token");
  //   const client = new ApolloClient({
  //     uri: "https://nutrition-tracker-be.herokuapp.com",
  //     headers: { authorization: idToken }
  //   });
  //   client
  //     .query({
  //       query: GET_CURRENT_USERID
  //     })
  //     .then(response => {
  //       this.setState({ currentUser: response.data.getCurrentUser.id });
  //       client
  //         .query({
  //           query: EXER_QUERY,
  //           variables: {
  //             userId: this.state.currentUser
  //           }
  //         })
  //         .then(response => {
  //           this.setState({
  //             exerEntries: response.data.getExerciseEntriesByUserId
  //           });
  //         });
  //     })
  //     .catch(err => console.log(err));
  // };

  componentDidUpdate(prevProps) {
    if (prevProps.exerEntries !== this.props.exerEntries) {
      this.setState({ exerEntries: this.props.exerEntries });

    }

  }



  render() {
//     let exerciseId = this.props;
// console.log('exerciseId', exerciseId)
//     let exerciseName;
//     let caloriesBurned;
//     const editExercise = this.props.exerEntries.find((exercise) => { return `${exercise.id}` === exerciseId});
//     console.log('editExercise', editExercise);
//      if (editExercise){
//       exerciseName = editExercise.exerciseName;
//       caloriesBurned = editExercise.caloriesBurned;
//       // id = editExercise.id;
//     }
//     console.log("this.props", this.props)


    const dateToday = new Date();
    const month = dateToday.getMonth();
    const day = dateToday.getDate();
    const year = dateToday.getFullYear();
    let exerEntries = this.props.exerEntries;
    exerEntries = exerEntries.filter(entry => {
      const dateEntry = new Date(entry.exerciseEntryDate);
      const entryMonth = dateEntry.getMonth();
      const entryDay = dateEntry.getDate();
      const entryYear = dateEntry.getFullYear();
      return entryMonth === month && entryDay === day && entryYear === year;
    });
    if (exerEntries.length === 0) {
      return <div>No exercise entered today.</div>;
    } else {
      return (
        <ExerciseEntry>
          <div>Today's exercises: </div>
          {exerEntries.map(entry => (
            <div onClick={() => this.passExerData(entry)}
            >
             <div>
                <ExerciseActivity key={entry.id}
                entry = {entry}
                >

                  <div>Activity: {entry.exerciseName}</div>
                  <div>Calories burned: {entry.caloriesBurned}</div>

                </ExerciseActivity>

              </div>
            </div>
          ))}
        <ExerciseModal
         isOpen={this.state.showModal}
         itemOpen={this.state.foodEntries}

         >
           {this.state.exerEntry &&

                <ExerciseActivity key={this.state.exerEntry.id}>
                  <div>Activity: {this.state.exerEntry.exerciseName}</div>
                  <div>Calories burned: {this.state.exerEntry.caloriesBurned}</div>

                </ExerciseActivity>
                 }


         <div onClick={this.closeModal}>No?</div>
          <div onClick={() => this.deleteExerEntry(this.state.exerEntry.id)}>Delete?</div>
    </ExerciseModal>
        </ExerciseEntry>
      );
    }
  }
}
export default ExerEntry;
