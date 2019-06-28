import React from "react";
import styled from "styled-components";
import BillingPlans from "../../Components/Billing/BillingPlans";
import Typing from "react-typing-animation";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SearchInputComponent from "../SearchComponent/SearchInputComponent";
import searchBarBg from "../../Assets/search-bar-bg.png";

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

  h1 {
    color: #40a798;
    font-size: 4em;
    font-size: 40px;
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
    font-size: 2rem;
    font-size: 20px;
    font-style: italic;
    color: #2c363f;
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
  /* flex-direction: column; */
  align-items: flex-start;
  padding-top: 30px;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.33%;
  justify-content: space-evenly;
  padding-bottom: 50px;
  align-items: center;
  text-align: center;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const SearchFeature = styled.div`
  width: 100%;
`;

const Feature_Reverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 70%;
  justify-content: space-around;
  padding-bottom: 50px;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
  }
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
    /* font-size: 2rem; */
    font-size: 30px;
    padding: 10px 0 0;
    font-family: "Oswald", sans-serif;
  }
  hr {
    color: #ffffff;
  }
  p {
    color: #fcfcfb;
    /* font-size: 1.2rem; */
    font-size: 20px;
  }
`;

const ImgCon = styled.div`
  max-width: 50%;
  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

const styles = theme => ({
  root: {
    maxWidth: 960,
    width: "100%"
  },
  forms: {
    display: "flex"
  },
  searchBar: {
    background: `url(${searchBarBg}) no-repeat center`,
    backgroundSize: "cover"
  },
  searchBarCon: {
    padding: "200px 100px",
    fontSize: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  secTitle: {
    color: " #545454",
    fontSize: 30,
    padding: "10px 0 0",
    fontFamily: "Oswald"
  },
  secP: {
    color: "#545454",
    fontSize: 20
  }
});

// const { classes } = props;

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
          {/* <Features>
          <Feature>
            <ImgCon>
              <FeatureImg
                alt="photo by Lily Banse - unsplash @lvnatikk"
                src={require("../../Assets/food_image.jpeg")}
              />
            </ImgCon>
            <FeatureInfo>
              <h2> Food Database API</h2>
              <hr />
              <p> Search our integrated food database or create your own. </p>
            </FeatureInfo>
          </Feature>

          <Feature_Reverse>
            <ImgCon>
              <FeatureImg src={require("../../Assets/custom_reports.png")} />
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
          </Feature_Reverse>

          <Feature>
            <ImgCon>
              <FeatureImg
                alt="photo by bruce mars - unsplash @brucemars"
                src={require("../../Assets/trainer.jpeg")}
              />
            </ImgCon>
            <FeatureInfo>
              <h2> Trainer functionality (future release)</h2>
              <hr />
              <p>
                Have your trainer be included in your journey. Whether it's just
                to see your progress or keep you accountable, our trainer
                feature allows you to get that trainer-trainee communication.
              </p>
            </FeatureInfo>
          </Feature>
        </Features> */}
          <Features>
            <Feature>
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

            <Feature>
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

            <Feature>
              <ImgCon>
                <FeatureImg
                  alt="icon by freepik from flaticon.com"
                  src={require("../../Assets/support.png")}
                />
              </ImgCon>
              <FeatureInfo>
                <h2> Trainer Functionality</h2>
                <hr />
                <p>
                  (future release)
                  <br />
                  Whether you want your trainer to see your progress or keep you
                  accountable, our trainer feature allows you to communicate
                  easily.
                </p>
              </FeatureInfo>
            </Feature>
          </Features>
        </Container>
      </SecondPane>
      <Container className={classes.searchBar}>
        <Container className={classes.searchBarCon}>
          <Typography className={classes.secTitle}>Give it a shot.</Typography>
          <Typography className={classes.secP}>
            Search for a food and see its nutritional information.
          </Typography>
          <SearchFeature>
            <SearchInputComponent
              updateSearch={props.updateSearch}
              searchInput={props.searchInput}
              getFoodData={props.getFoodData}
            />
          </SearchFeature>
        </Container>
      </Container>
      <BillingDiv>
        <Container className={classes.root}>
          <BillingPlans />
        </Container>
      </BillingDiv>
    </>
  );
}

export default withStyles(styles)(Home);
