import React, { Component } from "react";
import { Typography, Container, Grid } from "@material-ui/core";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import alando from "../Assets/team/alando.jpeg";
import leila from "../Assets/team/leila.jpeg";
import david from "../Assets/team/david.jpeg";
import jamar from "../Assets/team/jamar.jpeg";
import christene from "../Assets/team/christene.jpeg";
import github from "../Assets/GitHub.png"
import linkedin from "../Assets/linkedIn.png"

const ImgCon = styled.div`
  width: 100%;
  max-width: 200px;
  img {
    width: 100%;
    border-radius: 50%;
    border: 10px solid #5e366a;
    &.icon {
      border: none;
      max-width: 32px;
      border-radius: 0;
    }
  }
`;

const Contact = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const styles = theme => ({
  heading: {
    fontSize: 30,
    fontFamily: "Oswald",
    textAlign: "center",
    margin: "50px"
  },
  teamMember: {
    width: "100%",
    maxWidth: 300,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    fontSize: 20,
    fontFamily: "Oswald"
  },
  desc: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    margin: "20px 0"
  }
});

function About(props) {
  const { classes } = props;
  return (
    <div>
      <Typography className={classes.heading}>Our Team</Typography>
      <Grid container>
        <Grid item xs={12} sm={3} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={leila} alt="photo of leila" />
            </ImgCon>
            <Typography className={classes.name}>Leila Berrouayel</Typography>
            <Contact>
              <ImgCon>
                <img className="icon" src={github} alt="GitHub icon" />
              </ImgCon>
              <ImgCon>
                <img className="icon" src={linkedin} alt="LinkedIn icon" />
              </ImgCon>
            </Contact>
            <Typography className={classes.desc}>We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={jamar} alt="photo of jamar" />
            </ImgCon>
            <Typography className={classes.name}>Jamar Torres</Typography>
            <Contact>
              <ImgCon>
                <img className="icon" src={github} alt="GitHub icon" />
              </ImgCon>
              <ImgCon>
                <img className="icon" src={linkedin} alt="LinkedIn icon" />
              </ImgCon>
            </Contact>
            <Typography className={classes.desc}>We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={david} alt="photo of david" />
            </ImgCon>
            <Typography className={classes.name}>David Chua</Typography>
            <Contact>
              <ImgCon>
                <img className="icon" src={github} alt="GitHub icon" />
              </ImgCon>
              <ImgCon>
                <img className="icon" src={linkedin} alt="LinkedIn icon" />
              </ImgCon>
            </Contact>
            <Typography className={classes.desc}>We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={alando} alt="photo of alando" />
            </ImgCon>
            <Typography className={classes.name}>Alando Appling</Typography>
            <Contact>
              <ImgCon>
                <img className="icon" src={github} alt="GitHub icon" />
              </ImgCon>
              <ImgCon>
                <img className="icon" src={linkedin} alt="LinkedIn icon" />
              </ImgCon>
            </Contact>
            <Typography className={classes.desc}>We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={christene} alt="photo of christene" />
            </ImgCon>
            <Typography className={classes.name}>Christene Bennett</Typography>
            <Contact>
              <ImgCon>
                <img className="icon" src={github} alt="GitHub icon" />
              </ImgCon>
              <ImgCon>
                <img className="icon" src={linkedin} alt="LinkedIn icon" />
              </ImgCon>
            </Contact>
            <Typography className={classes.desc}>We're acquainted with the wormhole phenomenon, but this... Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(About);
