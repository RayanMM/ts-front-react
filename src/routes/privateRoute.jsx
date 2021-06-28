import React,{ useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import JwtDecode from '../common/jwtDecode';

const PrivateRoute = ({ component: Component, isPrivate, ...rest }) => {

  const [signed, setSigned] = useState(true);

  useEffect(() =>{
    setSigned(JwtDecode.isAutenticed());
  }, []);

  if (!signed && isPrivate) {
    return <Redirect to="/logout"/>
  }

  return (
    <Route
      {...rest}
      render={props =>
        (
            <Component {...props} />
        )}
    />
  );
};

export default PrivateRoute;
