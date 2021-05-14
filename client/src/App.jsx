import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Budget from './components/Budget';
import Reg from './views/Reg';
import Log from './views/Log';
import ProtectedRoute from './components/protected.route';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Reg}/>
          <Route exact path="/login" component={Log}/>
          <ProtectedRoute exact path="/home">
            <Budget />
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
