import React from "react";
import styled from "styled-components";
// import logo from "../../Assets/logo-white.png";

// const Logo = styled.div`
//   max-width: 100px;
// `;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 50px;
  display: flex;
  align-self: flex-end;
  align-items: flex-end;
`;

const Main = styled.div`
  padding-top: 100px;
`;

const Tagline = styled.div`
  font-size: 3.5rem;
  letter-spacing: 2px;
  line-height: 1.2;
  margin-bottom: 20px;
`;

const Features = styled.div`
  width: 50%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 50px 20px;
  margin: 50px auto;
`;
const Home = () => (
  <div className="home">
    <Container>
      <Main>
        <div className="home-text">
          <Tagline>
            Quick, easy food tracking to help you accomplish your health goals
          </Tagline>
          <div className="detail">
            Deflector power at maximum. Energy discharge in six seconds. Warp
            reactor core primary coolant failure. Fluctuate phaser resonance
            frequencies.
          </div>
        </div>
        <Features>
          <div className="feature-box">
            <div className="feature-img">
              <img src="http://lorempixel.com/200/200/food" alt="food"/>
            </div>
            <div className="feature-text">Lorem Ipsum</div>
          </div>
          <div className="feature-box">
            <div className="feature-img">
              <img src="http://lorempixel.com/200/200/technics" alt="technics"/>
            </div>
            <div className="feature-text">Lorem Ipsum</div>
          </div>
          <div className="feature-box">
            <div className="feature-img">
              <img src="http://lorempixel.com/200/200/people" alt="people"/>
            </div>
            <div className="feature-text">Lorem Ipsum</div>
          </div>
        </Features>
      </Main>
    </Container> // container
  </div>
);

export default Home;
