import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import alando from "../Assets/team/alando.jpeg";
import leila from "../Assets/team/leila.jpeg";
import david from "../Assets/team/david.jpeg";
import jamar from "../Assets/team/jamar.jpeg";
import christene from "../Assets/team/christene.jpeg";
import github from "../Assets/GitHub.png";
import linkedin from "../Assets/linkedIn.png";

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
      margin: 10px;
    }
  }
`;

const Contact = styled.div`
  display: flex;
  justify-content: center;
`;

const Hr = styled.div`
  width: 90%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 auto 50px auto;
`;

const styles = theme => ({
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
  teamCon: {
    width: "100%",
    maxWidth: 900,
    margin: "0 auto"
  },
  teamMember: {
    width: "100%",
    maxWidth: 300,
    margin: "0 auto 20px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    fontSize: 20,
    fontFamily: "Oswald",
    marginTop: 10
  },
  desc: {
    fontSize: 16,
    padding: "0 20px 20px 20px",
    textAlign: "center"
  }
});

function About(props) {
  const { classes } = props;
  return (
    <div>
      <Typography className={classes.heading}>The HelloMelon Team</Typography>
      <Typography className={classes.subHeading}>
        We're the team that is dedicated to helping you keep track of your
        health.
      </Typography>
      <Hr />
      <Grid container className={classes.teamCon}>
        <Grid item xs={12} sm={6} md={4} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={leila} alt="photo of leila" />
            </ImgCon>
            <Typography className={classes.name}>Leila Berrouayel</Typography>
            <Contact>
              <a target="_blank" href="https://github.com/leila100">
                <ImgCon>
                  <img className="icon" src={github} alt="GitHub icon" />
                </ImgCon>
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/leila-berrouayel/">
                <ImgCon>
                  <img className="icon" src={linkedin} alt="LinkedIn icon" />
                </ImgCon>
              </a>
            </Contact>
            <Typography className={classes.desc}>
            Leila is a full-stack developer who's always loved coding. Graduating with a Masters in Computer Science, she worked for two years before interrupting her career to raise her three daughters. Joined Lambda School to give her career in tech another chance.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={jamar} alt="photo of jamar" />
            </ImgCon>
            <Typography className={classes.name}>Jamar Torres</Typography>
            <Contact>
              <a target="_blank" href="https://github.com/jrizza88">
                <ImgCon>
                  <img className="icon" src={github} alt="GitHub icon" />
                </ImgCon>
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/jamartorres/">
                <ImgCon>
                  <img className="icon" src={linkedin} alt="LinkedIn icon" />
                </ImgCon>
              </a>
            </Contact>
            <Typography className={classes.desc}>
            Jamar is a full-stack web developer who is most intrigued with user experience and front end development. He comes from a background of international relations, but has found the world of web development to be his true passion. He enjoys continous learning to improve on his knowledge and to gain new experience. When not coding, Jamar can be found gaming, checking out the food scene of new york or going for a nice jog!
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={david} alt="photo of david" />
            </ImgCon>
            <Typography className={classes.name}>David Chua</Typography>
            <Contact>
              <a target="_blank" href="https://github.com/david-chua">
                <ImgCon>
                  <img className="icon" src={github} alt="GitHub icon" />
                </ImgCon>
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/dpchua/">
                <ImgCon>
                  <img className="icon" src={linkedin} alt="LinkedIn icon" />
                </ImgCon>
              </a>
            </Contact>
            <Typography className={classes.desc}>
            David is a full-stack developer with a passion for JavaScript, React, and debugging. He has a background in tech support, retail, and hospitality. Today, he is constantly eager to not only improve his current skill but also to learn new technologies. With programming, the sky is the limit and that sky is the entire world wide web.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={alando} alt="photo of alando" />
            </ImgCon>
            <Typography className={classes.name}>Alando Appling</Typography>
            <Contact>
              <a target="_blank" href="https://github.com/Landoooooo">
                <ImgCon>
                  <img className="icon" src={github} alt="GitHub icon" />
                </ImgCon>
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/alando-appling-30ab1371/">
                <ImgCon>
                  <img className="icon" src={linkedin} alt="LinkedIn icon" />
                </ImgCon>
              </a>
            </Contact>
            <Typography className={classes.desc}>
              Alando is a dedicated Software Development Student at Lambda School, using the MERN stack (Mongo, Express, React, Node). 
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} justify="center">
          <Grid container justify="center" className={classes.teamMember}>
            <ImgCon>
              <img src={christene} alt="photo of christene" />
            </ImgCon>
            <Typography className={classes.name}>Christene Bennett</Typography>
            <Contact>
              <a target="_blank" href="https://github.com/christenebennett">
                <ImgCon>
                  <img className="icon" src={github} alt="GitHub icon" />
                </ImgCon>
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/christene-bennett/">
                <ImgCon>
                  <img className="icon" src={linkedin} alt="LinkedIn icon" />
                </ImgCon>
              </a>
            </Contact>
            <Typography className={classes.desc}>
            Christene is a full-stack web developer who is fascinated with user experience and design. She comes from the world of customer service and is excited to be using her creativity with code as her medium. When she's not coding, Christene can be found discovering the best food the Phoenix area has to offer. 
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(About);
