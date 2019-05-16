import React from 'react';
import Button from '@material-ui/core/Button';


const Home = () => (
  <div className="home">
    <div className="container">
      <header className="header-home">
        <div className="logo">Nutrition Buddy</div>
        <div>
          <Button>About Us</Button>
          <Button>Plans</Button>
          <Button>Get Started</Button>
        </div>
      </header>
      <main>
        <div className="home-text">
          <div className="tagline">Quick, easy food tracking to help you accomplish your health goals</div>
          <div className="detail">Deflector power at maximum. Energy discharge in six seconds. Warp reactor core primary coolant failure. Fluctuate phaser resonance frequencies.</div>
        </div>
        <div className="features-con">
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
        </div>
      </main>
    </div>
  </div>
)


export default Home;