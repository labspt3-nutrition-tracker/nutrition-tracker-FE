import React from "react";
import Modal from 'react-modal';
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import moment from "moment";
import { GET_CURRENT_USERID, EXER_QUERY, GET_EXERCISE_ENTRIES_QUERY} from "../../graphql/queries";
import { DELETE_EXERENTRY , EDIT_EXER_ENTRY } from '../../graphql/mutations';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";


const ExerciseActivity = styled.div`
  padding: 10px;
`;

const ExerciseEntry = styled.div`

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;


const ModalButton = styled.button`
  color: #FCFCFB;
  background: #F4B4C3;
  margin-bottom: 5px;
  padding: 5px 15px;
  font-size: .9em;
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
      // currentUser: 0,
      // exerEntries: [],
      showModal: false,
      exerEntry: [],
      newExerEntry: {
        exerciseEntryDate: "",
        exerciseName: "",
        caloriesBurned: "",
        exercise_entry_user_id: 0
      },
      errorMsg: {
        error: false,
        errorName: "",
        errorCal: "",
        errorDate: ""
      }
    };
  }

  openModal = () => {
    this.setState({
      showModal: true
    })
  }

  passExerciseData = (entry) => {
    this.props.passExerData(entry)
    this.openModal()
  }


  // editExerEntry = (userId, exercise, idToken) => {
  //   const client = new ApolloClient({
  //     uri: "https://nutrition-tracker-be.herokuapp.com",
  //     headers: { authorization: idToken }
  //   });
  //   client
  //     .mutate({
  //       mutation: EDIT_EXER_ENTRY,
  //       variables: {
  //        id:userId, input: exercise
  //       }
  //     })
  //     .then(response => {
  //       this.setState( {
  //         exerEntry: response.data.
  //        });
  //        this.closeModal()
  //        console.log(this.state)
  //       console.log(this.state.exerEntry);
  //     })
  // };

  editExerciseEntry = (entry) => {
    console.log('edit', entry)
    this.props.editExerEntry(entry)
    this.closeModal();
  }

  deleteExercise = (id) => {
    console.log(id)
    this.props.deleteExerEntry(id)
    this.closeModal();
  }

  

  closeModal = () => {
    console.log('modal closed')
    this.setState({ showModal: false})
  }
  

  componentDidUpdate(prevProps) {
    if (prevProps.exerEntries !== this.props.exerEntries) {
      this.setState({ exerEntries: this.props.exerEntries, exerEntry: this.props.exerEntry });
    }
  }

  // onInputChange = e => {
  //   this.setState({
  //     exerEntry: {
  //       ...this.state.exerEntry,
  //       [e.target.name]:
  //         e.target.type === "number" ? parseInt(e.target.value) : e.target.value
  //     }
  //   });
  //   console.log("exerentry change",this.state.exerEntry)
  // };


  render() {

    //  let date = moment(new Date()).format("MMMM Do YYYY");
    //  console.log('date', date)
    const dateToday = new Date();
    const month = dateToday.getMonth();
    const day = dateToday.getDate();
    const year = dateToday.getFullYear();
    let exerEntries = this.props.exerEntries;
    console.log(exerEntries)
    exerEntries = exerEntries.filter(entry => {
      const dateEntry = new Date(entry.exerciseEntryDate);
      const entryMonth = dateEntry.getMonth();
      const entryDay = dateEntry.getDate();
      const entryYear = dateEntry.getFullYear();
      // let date = moment().format("ddd MMMM D YYYY");
    //  date = entry.date

    // return moment(new Date(entry.date)).format("ddd MMMM D YYYY") ===  moment(new Date(date)).format("ddd MMMM D YYYY")
      return entryMonth === month && entryDay === day && entryYear === year;
    });
    if (exerEntries.length === 0) {
      return <div>No exercise entered today.</div>;
    } else {
      return (
        <ExerciseEntry>
          <div>Today's exercises: </div>
          {exerEntries.map(entry => (
            <div onClick={() => this.passExerciseData(entry)}
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
        //  itemOpen={this.state.foodEntries}
         >



           {this.props.exerEntry &&

<Form>
<TextField
  required
  error={this.state.errorMsg.errorName}
  autoFocus
  margin="dense"
  label="Name of Exercise"
  className="form-field"
  type="text"
  placeholder="Add exercise here..."
  onChange={this.props.onInputChange}
  name="exerciseName"
  value={this.props.exerEntry.exerciseName}
  aria-describedby="errorName-text"
/>
<FormHelperText id="errorName-text">
  {this.state.errorMsg.errorName}
</FormHelperText>

<TextField
  label="Date"
  className="form-field"
  type="date"
  name="exerciseEntryDate"
  error={this.state.errorMsg.errorDate}
  onChange={this.props.onInputChange}
  required
  aria-describedby="errorDate-text"
  // defaultValue={this.state.exerEntry.exerciseEntryDate}
   value={moment(this.props.exerEntry.exerciseEntryDate).format('YYYY-MM-DD')}
/>
<FormHelperText id="errorDate-text">
  {this.state.errorMsg.errorDate}
</FormHelperText>

<TextField
  autoFocus
  margin="dense"
  error={this.state.errorMsg.errorCal}
  label="Calories Burned"
  className="form-field"
  type="number"
  name="caloriesBurned"
  onChange={this.props.onInputChange}
  value={this.props.exerEntry.caloriesBurned}
  required
  step="1"
  aria-describedby="errorCal-text"
/>

<FormHelperText id="errorCal-text">
  {this.state.errorMsg.errorCal}
</FormHelperText>

<Button className="form-field" type="submit" onClick={() => this.editExerciseEntry(this.props.exerEntry.id)}>
  Edit Entry
</Button>
</Form>


                // <ExerciseActivity key={this.state.exerEntry.id}>
                //   <div>Activity: {this.state.exerEntry.exerciseName}</div>
                //   <div>Calories burned: {this.state.exerEntry.caloriesBurned}</div>

                // </ExerciseActivity>
                 }


         <ModalButton onClick={this.closeModal}>No?</ModalButton>
         <ModalButton onClick={() => this.deleteExercise(this.props.exerEntry.id)}>Delete?</ModalButton>
</ExerciseModal>

        </ExerciseEntry>
      );
    }
  }
}
export default ExerEntry;
