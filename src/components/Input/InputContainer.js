import React, {Component} from 'react';

export default class InputContainer extends Component{
    render(){
        return(
            <div className="form-group is-empty text-center">
                {this.props.children}
                <label htmlFor={this.props.labelFor}>{this.props.label}</label>
            <span className="material-input"></span>
            </div>
        );
    }
}