import React from "react";
import styled from "styled-components";
import BillingPlans from "../../Components/Billing/BillingPlans";
import Typing from "react-typing-animation";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SearchInputComponent from "../SearchComponent/SearchInputComponent";
import searchBarBg from "../../Assets/search-bar-bg.png";
import coachBg from "../../Assets/coach-bg.png";
import support from "../../Assets/support.png";

const ContainerHome = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row-reverse;
  width: 100%;
  height: 70vh;

  @media (max-width: 800px) {
    flex-direction: column;
    height: 50vh;
  }
`;

const Main = styled.div`
  width: 100%;
  padding-left: 10%;
  padding-top: 250px;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 800px) {
    padding-top: 160px;
    padding-left: 0;
  }

  @media (max-width: 500px) {
    align-items: center;
  }

  h1 {
    color: #40a798;
    font-size: 70px;
    font-size: 7rem;
    font-family: "Oswald", sans-serif;
    @media (max-width: 340px) {
      font-size: 50px;
      font-size: 5rem;
    }
  }

  @media (max-width: 800px) {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
`;

const TypingDiv = styled.div`
  display: block;
  padding-top: 20px;
  padding-left: 10px;
  h3 {
    font-size: 3rem;
    font-size: 30px;
    font-style: italic;
    color: #2c363f;
    font-family: "Roboto", sans-serif;
  }
`;

const Tagline = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 30px;
  color: #fcfcfb;
  font-family: "Oswald", sans-serif;
`;

const SecondPane = styled.section`
  width: 100%;
  background: #5e366a;
  padding: 40px 0;
`;

const BillingDiv = styled.div`
  background: #fcfcfb;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Features = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 30px;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.33%;
  justify-content: space-evenly;
  padding-bottom: 50px;
  align-items: center;
  text-align: center;
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const SearchFeature = styled.div`
  width: 100%;
`;

const FeatureImg = styled.img`
  width: 100%;
`;

const FeatureInfo = styled.div`
  width: 100%;
  padding: 20px;
  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
  }
  h2 {
    color: #ffffff;
    font-size: 30px;
    padding: 10px 0 0;
    font-family: "Oswald", sans-serif;
  }
  hr {
    color: #ffffff;
  }
  p {
    color: #fcfcfb;
    font-size: 20px;
  }
`;

const SearchBarSec = styled.section`
  background: url(${searchBarBg}) no-repeat center;
  background-size: cover;
  width: 100%;
`;

const CoachSec = styled.section`
  background: url(${coachBg}) no-repeat center;
  background-size: cover;
  width: 100%;
  width: 95%;
  margin: 3% auto;
`;

const ImgCon = styled.div`
  max-width: 50%;
  @media (max-width: 500px) {
    max-width: 200px;
  }
`;
const ImgConCoach = styled.div`
  max-width: 250px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 0;
  img {
    width: 100%;
  }
  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

const Hr = styled.div`
  width: 90%;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.4);
`;

const styles = theme => ({
  root: {
    maxWidth: 960,
    width: "100%"
  },
  forms: {
    display: "flex"
  },
  searchBarCon: {
    padding: "200px 100px",
    fontSize: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  coachCon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  secTitle: {
    color: " #ffffff",
    fontSize: 30,
    padding: "10px 0 0",
    fontFamily: "Oswald",
    paddingBottom: 10,
    textAlign: "center"
  },
  secP: {
    color: "#ffffff",
    fontSize: 20,
    paddingBottom: 20,
    textAlign: "center"
  },
  secPcoach: {
    color: "#ffffff",
    fontSize: 20,
    paddingBottom: 75,
    paddingTop: 20,
    textAlign: "center"
  }
});

function Home(props) {
  const { classes } = props;
  return (
    <>
      <ContainerHome className="home">
        <Container className={classes.root}>
          <Main>
            <h1> My goal is... </h1>
            <TypingDiv>
              <Typing loop>
                <Typing.Speed ms={100} />
                <h3> ...to lose weight </h3>
                <Typing.Backspace count={20} />
                <h3> ...to eat healthier</h3>
                <Typing.Backspace count={20} />
                <h3> ...to try the Keto diet </h3>
                <Typing.Backspace count={30} />
                <h3> ...to gain muscle</h3>
                <Typing.Backspace count={30} />
                <Typing.Reset delay={5} />
              </Typing>
            </TypingDiv>
          </Main>
        </Container>
      </ContainerHome>
      <SecondPane>
        <Container className={classes.root}>
          <Tagline>
            Quick, easy food tracking to help you accomplish your health goals
          </Tagline>
          <Features>
            <Feature
              data-aos="fade-right"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <ImgCon>
                <FeatureImg
                  alt="icon made by freepik from flaticon.com"
                  src={require("../../Assets/diet.png")}
                />
              </ImgCon>
              <FeatureInfo>
                <h2> Food Database API</h2>
                <hr />
                <p>
                  {" "}
                  Search our integrated food database or create your own. You
                  can even choose foods from popular brands and restaurants.
                </p>
              </FeatureInfo>
            </Feature>

            <Feature
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <ImgCon>
                <FeatureImg
                  alt="icon by freepik from flaticon.com"
                  src={require("../../Assets/data.png")}
                />
              </ImgCon>
              <FeatureInfo>
                <h2> Custom Reports</h2>
                <hr />
                <p>
                  See your progress with our customer reports. Whether your goal
                  is to keep track of your nutrients or just a calory count, we
                  have it all for you.
                </p>
              </FeatureInfo>
            </Feature>

            <Feature
              data-aos="fade-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1500"
            >
              <ImgCon>
                <FeatureImg
                  alt="icon by freepik from flaticon.com"
                  src={require("../../Assets/support.png")}
                />
              </ImgCon>
              <FeatureInfo>
                <h2> Coach Functionality</h2>
                <hr />
                <p>
                  Whether you want a friend or your personal trainer to see your
                  progress or keep you accountable, our coach feature allows you
                  to communicate your progress easily.
                </p>
              </FeatureInfo>
            </Feature>
          </Features>
        </Container>
      </SecondPane>
      <CoachSec>
        <Container className={classes.coachCon}>
          <ImgConCoach
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <img src={support} alt="coach icon" />
          </ImgConCoach>
          <Typography className={classes.secTitle}>
            Accomplishing goals is easier when you have accountability
          </Typography>
          <Hr />
          <Typography className={classes.secPcoach}>
            Whether you want a coach or a buddy to see your progress or simply
            keep you accountable, our coach feature allows you to communicate
            easily
          </Typography>
        </Container>
      </CoachSec>
      <SearchBarSec>
        <Container className={classes.searchBarCon}>
          <Typography className={classes.secTitle}>Give it a shot.</Typography>
          <Typography className={classes.secP}>
            Search for a food and see its nutritional information.
          </Typography>
          <SearchFeature
            data-aos="zoom-in-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <SearchInputComponent
              updateSearch={props.updateSearch}
              searchInput={props.searchInput}
              getFoodData={props.getFoodData}
            />
          </SearchFeature>
        </Container>
      </SearchBarSec>
      <BillingDiv>
        <Container className={classes.root}>
          <BillingPlans />
        </Container>
      </BillingDiv>
    </>
  );
}

export default withStyles(styles)(Home);
