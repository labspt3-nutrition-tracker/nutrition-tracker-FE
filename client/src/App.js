import React from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';

import Billing from './Components/Billing';

function App() {
  return (
    <div className="App">
      <div>
        <Route 
        exact path="/billing" render={() => <Billing /> }/>
      </div>
    </div>
  );
}

export default App;
