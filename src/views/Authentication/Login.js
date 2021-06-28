import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as AuthActions from '../../store/Auth/actions';
import InputContainerIcon from '../../components/Input/InputContainerIcon';
import Button from '../../components/Common/Button';
import Img from '../../components/Common/Img';
import logo from '../../assets/img/TS_logo.png';
import ForgotPassword from './ForgotPassword';
import {Modal} from 'react-bootstrap';
import '../../assets/css/login.css';
import {Alert} from '../../components/Common/SweetAlert';

const Login = ({login, loading, success, error}) =>{
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [forgotModal, setForgotModal] = useState(false);
    const [signIn, setSignIn] = useState(false);
    
    const setLogin = (event) => {
        
        event.preventDefault();

        let data = {userLogin: user, userPassword: password};

       login(data);
    }

    useEffect(() => {
        if(success && !loading)
            setSignIn(true);
        else if(!success && error)
            Alert({
                title: "Ops!",
                text: "Username or password incorrect",
                type: 2,
                time: 2000
            });

    }, [success, loading]);

    if(signIn)
        return <Redirect to="/SystemHome"/>

    return(
        <div className="container-fluid">
            <div className="row center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <Img src={logo} height="100px" width="100px"></Img>
                                </div>
                            </div>
                            <h5 className="card-title text-center">Sign in</h5>
                            <form onSubmit={(e) => setLogin(e)}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <InputContainerIcon icon="user">
                                            <input type="text" className="form-control" value={user} required={true} maxLength={150} onChange={(e) => setUser(e.target.value)}></input>
                                        </InputContainerIcon>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <InputContainerIcon icon="key">
                                            <input type="password" className="form-control" value={password} required={true} maxLength={150} onChange={(e) => setPassword(e.target.value)}></input>
                                        </InputContainerIcon>
                                    </div>
                                </div>
                                <div className="row">
                                    <Button type='submit' value ='Login' className="btn btn-primary btn-lg pull-left"></Button>
                                    <Button type='button' value ='Forgot Password' className="btn btn-secondary btn-lg pull-right" click={() => setForgotModal(!forgotModal)}></Button>
                                </div>
                                <div className="row">
                                    {
                                        loading ? 
                                            <div className={`col-md-12 text-center showIt`}>
                                                <div className="top a1"></div>
                                                <div className="top a2"></div>
                                                <div className="top a3"></div>
                                                <div className="top a4"></div>
                                            </div>
                                        : null
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={forgotModal} dialogClassName="customSmall">
                <Modal.Body>
                    <Modal.Title>
                        Forgot password
                        <div className="modal-closebtn" onClick={() => setForgotModal(!forgotModal)}>
                            <div className="closeIcon">X</div>
                        </div>
                    </Modal.Title>
                    <br/>
                    <ForgotPassword user={user}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}


const mapStateToProps  = state => {   
    return {
        loading: state.auth.loading,
        success: state.auth.success,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        login: (data) =>{
            dispatch(AuthActions.signInRequest(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);