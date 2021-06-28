import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import Main from '../views/SystemHome/Main';
import Logout from '../views/Authentication/Logout';
import PrivateRoute from './privateRoute';

const Routes = () => (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={Main} isPrivate/>
        <PrivateRoute path="/SystemHome" exact component={Main} isPrivate/>
        <Route path="/logout" exact component={Logout}/>
        <Route path="/Auth" exact component={App}/>
        <Route path="/" component={() =>{ return <h1>Page not found</h1>}} /> 
      </Switch>
    </Router>
  );
  
  export default Routes;