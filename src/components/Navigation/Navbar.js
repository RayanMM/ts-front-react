import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sidebar from './Sidebar';
import Content from './Content';
import { Redirect } from 'react-router-dom';
import JwtDecode from '../../common/jwtDecode';

const NavBar = () => {
    const [name, setName] = useState("");
    const [colapsed, setColapsed] = useState(false);
    const [logOut, setLogOut] = useState(false);

    useEffect(()=>{
        setName(JwtDecode.getUserName());
    }, []);

    const logThisOut = (event) =>{
        event.preventDefault();
        setLogOut(true);
    }
    
    if(logOut)
        return <Redirect to="/logout"/>

    return(
        <div className="wrapper">
            <Sidebar colapsed={colapsed}/>
            <div id="content">
                <nav className="navbar navbar-light bg-ts custom">
                    <div className="colapseBtn" onClick={() => setColapsed(!colapsed)}>
                        <FontAwesomeIcon icon="bars" />
                    </div>
                    <div className="nav-bar-user">
                        <>{name}&nbsp;&nbsp;</>
                        <FontAwesomeIcon className="sign-out" icon="sign-out-alt" onClick={(e) => logThisOut(e)}></FontAwesomeIcon>
                    </div>
                </nav>
                <Content/>
            </div>
        </div>
    );
}

export default NavBar;