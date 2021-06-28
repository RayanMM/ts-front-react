import React,{ useEffect, useState }  from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as AuthActions from '../../store/Auth/actions';

const Logout = ({signOut, signedOut}) =>{
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        signOut();
    }, []);

    useEffect(()=>{
        localStorage.clear();
        setLogout(true);
    }, [signedOut])

    if(logout)
      return <Redirect to="/Auth"/>
    
    return(
        <div>
            Logging out
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        signedOut: state.auth.signedOut
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        signOut:() =>{
            dispatch(AuthActions.signOut());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);