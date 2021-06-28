import React, {Component} from 'react';
import InputContainerIcon from '../../components/Input/InputContainerIcon';
import Button from '../../components/Common/Button';
import {connect} from 'react-redux';
//import LoginApi from '../../models/Login/LoginApi';

class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = {user: this.props.user};
    }

    setProperties(InputName, event){
        var field = {};
        field[InputName] = event.target.value;
        this.setState(field);
    }

    passwordRecovery(event){
        event.preventDefault();
        this.props.passwordRecovery(this.state.user);
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-center">Fill out the field bellow with your e-mail</h5>
                        <form onSubmit={this.passwordRecovery.bind(this)}>
                            <div className="row">
                                <div className="col-md-12">
                                    <InputContainerIcon icon="user">
                                        <input type="email" className="form-control" value={this.state.user} required={true} maxLength={150} onChange={this.setProperties.bind(this, 'user')}></input>
                                    </InputContainerIcon>
                                </div>
                            </div>
                            <div className="row">
                                <Button type='submit' value ='Recover' className="btn btn-secondary btn-lg pull-right"></Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps  = state => {   
    return {
        loginReturn: state.login, 
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        login: (userLogin) =>{
           // dispatch(LoginApi.passwordRecovery(userLogin));
        }
    }
}

const ExportForgotLogin = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

export default ExportForgotLogin;