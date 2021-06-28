import React, {useEffect, useState} from 'react';
import JwtDecode from '../../common/jwtDecode';
import NavBar from '../../components/Navigation/Navbar';
import {Redirect} from 'react-router-dom';

const Main = () => {
    const [signed, setSigned] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setSigned(JwtDecode.isAutenticed());
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    if (!signed){
        return <Redirect to="/logout"/>
    }

    return(
        <NavBar></NavBar>
    );
}

export default Main;