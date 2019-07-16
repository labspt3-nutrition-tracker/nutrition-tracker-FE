import React from "react";
import { Typography, TextField, FormHelperText, Card, Button } from "@material-ui/core";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

const Hr = styled.div`
  width: 90%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 auto 50px auto;
`;

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    margin: "0 auto 50px",
    padding: 20
  },
  heading: {
    fontSize: 30,
    fontFamily: "Oswald",
    textAlign: "center",
    margin: "50px 0 20px"
  },
  subHeading: {
    fontSize: 20,
    fontFamily: "Oswald",
    textAlign: "center",
    margin: 20
  },
  formTitle: {
    fontFamily: "Oswald",
    fontWeight: 100,
    fontSize: "2.5rem"
  },
  input: {
    fontSize: 16,
    width: "100%",
    maxWidth: 400,
    // minWidth: 300,
    margin: "0 auto",
    lineHeight: 1.2
  },
  formButton: {
    fontSize: 16,
    width: "100%"
  }
});

const About = props => {
  const { classes } = props;
  return (
    <div>
      <Typography className={classes.heading}>Get in Touch</Typography>
      <Typography className={classes.subHeading}>
        Have some feedback? We're ready to listen.
      </Typography>
      <Hr />
      <Card className={classes.root}>
      <TextField
        required
        // error={this.state.errorMsg.errorName}
        autoFocus
        // margin="dense"
        label="Name"
        // className="form-field"
        type="text"
        placeholder="Name"
        fullWidth
        // onChange={this.onInputChange}
        name="contactName"
        aria-describedby="errorName-text"
        InputProps={{
          classes: {
            input: classes.input
          }
        }}
      />
      <FormHelperText id="errorName-text">
        {/* {this.state.errorMsg.errorName} */}
      </FormHelperText>
      
      <TextField
        required
        // error={this.state.errorMsg.errorName}
        autoFocus
        // margin="dense"
        label="Email"
        // classEmail="form-field"
        type="text"
        placeholder="Email"
        fullWidth
        // onChange={this.onInputChange}
        name="contactEmail"
        aria-describedby="errorEmail-text"
        InputProps={{
          classes: {
            input: classes.input
          }
        }}
      />
      <FormHelperText id="errorEmail-text">
        {/* {this.state.errorMsg.errorMsg} */}
      </FormHelperText>

      <TextField
        required
        // error={this.state.errorMsg.errorMsg}
        autoFocus
        // margin="dense"
        label="Message"
        // className="form-field"
        type="text"
        placeholder="Your Message"
        fullWidth
        // onChange={this.onInputChange}
        name="contactMsg"
        aria-describedby="errorMsg-text"
        multiline={true}
        InputProps={{
          classes: {
            input: classes.input
          }
        }}
      />
      <FormHelperText id="errorMsg-text">
        {/* {this.state.errorMsg.errorMsg} */}
      </FormHelperText>

      <Button className={classes.formButton}>Submit</Button>
      </Card>
    </div>
  );
};

export default withStyles(styles)(About);
