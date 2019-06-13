import React from "react";
import Modal from 'react-modal';
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { GET_CURRENT_USERID, EXER_QUERY, GET_EXERCISE_ENTRIES_QUERY} from "../../graphql/queries";
import { DELETE_EXERENTRY , EDIT_EXER_ENTRY } from '../../graphql/mutations';

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
      currentUser: 0,
      exerEntries: [],
      showModal: false,
      exerEntry: [],
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

  editExerEntry = (userId, exercise, idToken) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client 
      .mutate({
        mutation: EDIT_EXER_ENTRY,
        variables: {
         id:userId, input: exercise
        }
      })
      .then(response => {
        this.setState( { 
          exerEntry: response.data.deleteExerciseEntry
         });
         this.closeModal()
         console.log(this.state)
        console.log(this.state.exerEntry);
      })
  }

  deleteExerEntry = ( id, idToken) => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });
    client
      .mutate({
        mutation: DELETE_EXERENTRY, 
        variables: {id},
        updateQuery:{query: EXER_QUERY}
      })
  
      .then(response => {
        console.log('response', response)
        this.setState( { 
          exerEntry: response.data.deleteExerciseEntry
         });
         this.closeModal()
         console.log(this.state)
        console.log(this.state.exerEntry);
      })
      .then(response => {
        client
          .query({
            query: EXER_QUERY,
            variables: {
              userId: this.state.currentUser
            },
            updateQueries:
              {query: EXER_QUERY}
          })
    })
      // .then(response => {
      //   this.setState(deleteState => { 
      //     let deleteEntry = deleteState.exerEntries.filter ( i =>
      //       i.id !== id ? response.data.deleteExerciseEntry : null
      //     );
      //     // return {exerEntry: response.data.deleteExerciseEntry}
      //     return {exerEntry: deleteEntry}
      //    });
      //    this.closeModal()
      //   console.log(this.state.exerEntry);
      //   console.log(response.data.deleteExerciseEntry)
      // })
      .catch(err => console.log(err));
  }

  getCurrentUser = idToken => {
    const client = new ApolloClient({
      uri: "https://nutrition-tracker-be.herokuapp.com",
      headers: { authorization: idToken }
    });

    client
      .query({
        query: EXER_QUERY,
        updateQueries: [
          {query: EXER_QUERY}
        ]
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
      this.setState({ exerEntries: this.props.exerEntries, exerEntry: this.props.exerEntry });

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
