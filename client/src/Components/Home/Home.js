import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

const Home = () => (
  <div className="home">
    <div className="container">
      <header className="header-home">
        <div className="logo">Nutrition Buddy</div>
        <div>
          <Toolbar>
            <NavLink to="/">
              <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink to="/login">
              <Button color="inherit">Login</Button>
            </NavLink>
            <NavLink to="/settings">
              <Button color="inherit">Account</Button>
            </NavLink>
            <NavLink to="/reports">
              <Button color="inherit">Reports</Button>
            </NavLink>
            <NavLink to="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </NavLink>
          </Toolbar>
        </div>
      </header>
      <main>
        <div className="home-text">
          <div className="tagline">
            Quick, easy food tracking to help you accomplish your health goals
          </div>
          <div className="detail">
            Deflector power at maximum. Energy discharge in six seconds. Warp
            reactor core primary coolant failure. Fluctuate phaser resonance
            frequencies.
          </div>
        </div>
        <div className="features-con">
          <div className="feature-box">
            <div className="feature-img">
              <img src="http://lorempixel.com/200/200/food" />
            </div>
            <div className="feature-text">Lorem Ipsum</div>
          </div>
          <div className="feature-box">
            <div className="feature-img">
              <img src="http://lorempixel.com/200/200/technics" />
            </div>
            <div className="feature-text">Lorem Ipsum</div>
          </div>
          <div className="feature-box">
            <div className="feature-img">
              <img src="http://lorempixel.com/200/200/people" />
            </div>
            <div className="feature-text">Lorem Ipsum</div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

export default Home;
