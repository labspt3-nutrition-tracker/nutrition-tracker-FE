import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Components/Login';
import Settings from './Components/Settings';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/settings" component={Settings} />
      </main>
    </div>
  );
}

export default App;
