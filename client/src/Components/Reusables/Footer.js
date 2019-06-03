import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const FooterDiv = styled.div`
background: #F4B4C3;
`

  {/* Footer */}
    const Footer = () => (
      <FooterDiv>
      <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">Will update soon</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2019 Nutrition Tracker
        <br></br>
        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
      </div>
    </footer>
    </FooterDiv>
    )
      {/* End footer */}

      export default Footer;