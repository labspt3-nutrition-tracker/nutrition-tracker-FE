import React from 'react';
import Button from '@material-ui/core/Button';


const Home = () => (
  <div className="home">
    <header>
      <div>Nutrition Buddy</div>
      <div>
        <Button>About Us</Button>
        <Button>Plans</Button>
        <Button>Get Started</Button>
      </div>
    </header>
    <main>
      <div>Quick, easy food tracking to help you accomplish your health goals</div>
      <div>Deflector power at maximum. Energy discharge in six seconds. Warp reactor core primary coolant failure. Fluctuate phaser resonance frequencies.</div>
      <div className="features-con">
        <div className="feature-box">
          <div className="feature-img"></div>
          <div className="feature-text">Lorem Ipsum</div>
        </div>
        <div className="feature-box">
          <div className="feature-img"></div>
          <div className="feature-text">Lorem Ipsum</div>
        </div>
        <div className="feature-box">
          <div className="feature-img"></div>
          <div className="feature-text">Lorem Ipsum</div>
        </div>
      </div>
    </main>
  </div>
)


export default Home;