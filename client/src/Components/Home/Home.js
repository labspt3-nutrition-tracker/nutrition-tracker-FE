import React from "react";
import styled from "styled-components";
import BillingPlans from "../../Components/Billing/BillingPlans";
import Typing from "react-typing-animation";

const Container = styled.div`
  display: flex;
  align-self: center;
  flex-direction: row-reverse;
  width: 100%;
  height: 70vh;

  @media (max-width: 800px){
    flex-direction: column;reverse;

  }
`;

const Main = styled.div`
  width: 50%;
  padding-left: 10%;
  padding-top: 250px;

  h1{
    color: #40A798;
    font-size: 4em;
  }

  @media(max-width: 800px){
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
`;

const TypingDiv = styled.div`
  display: block;
  padding-top: 20px;
  padding-left: 10px;
  h3{
    font-size: 2em;
    font-style: italic;
    color: #2C363F;
  }
`;

const Tagline = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: 30px;
  color: #FCFCFB;
`;

const SecondPane = styled.section`
  width: 100%;
  background: #F4B4C3;
  padding: 40px 0;

`;

const BillingDiv = styled.div`
  background: #FCFCFB;
  padding-top: 50px;
  height: 70vh;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  justify-content: center;
`;

const Feature= styled.div`
  display: flex;
  width: 70%;
  justify-content: space-around;
  padding-bottom: 50px;
  align-items: center;

`;

const FeatureReverse= styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 70%;
  justify-content: space-around;
  padding-bottom: 50px;
  align-items: center;
`;

const FeatureImg = styled.img`
  width: 40%;
  height: 400px;
`;

const FeatureInfo = styled.div`
  width: 40%;
  h2{
    color: #2C363F;
    font-size: 1.4em;
    padding: 10px 0;
  }

  p{
    color: #FCFCFB;
    font-size: 1.2em;
  }
`;
const Home = () => (
  <div>
    <Container className="home">
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
    <SecondPane>
        <Tagline>
          Quick, easy food tracking to help you accomplish your health goals
        </Tagline>
        <Features>

          <Feature>
            <FeatureImg alt="photo by Lily Banse - unsplash @lvnatikk" src={require("../../Assets/food_image.jpeg")} />
            <FeatureInfo>
              <h2> Food Database API</h2>
              <p> Search our integrated food database or create your own. </p>
            </FeatureInfo>
          </Feature>

          <FeatureReverse>
            <FeatureImg src={require("../../Assets/custom_reports.png")} />
            <FeatureInfo>
              <h2> Custom Reports</h2>
              <p> See your progress with our customer reports. Whether your goal is to keep track of your nutrients or just a calory count, we have it all for you.</p>
            </FeatureInfo>
          </FeatureReverse>

          <Feature>
            <FeatureImg alt="photo by bruce mars - unsplash @brucemars" src={require("../../Assets/trainer.jpeg")} />
            <FeatureInfo>
              <h2> Trainer functionality (future release)</h2>
              <p> Have your trainer be included in your journey. Whether it's just to see your progress or keep you accountable, our trainer feature allows you to get that trainer-trainee communication.</p>
            </FeatureInfo>
          </Feature>
        </Features>
    </SecondPane>
    <BillingDiv >
      <BillingPlans />
    </BillingDiv>
  </div>
);


export default Home;
