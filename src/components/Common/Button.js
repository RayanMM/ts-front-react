import React, {Component} from 'react';

export default class Button extends Component{
    render(){
        return(
            <input type={this.props.type} className={this.props.className} value={this.props.value} onClick={this.props.click} disabled={this.props.disabled}></input>
        );
    }
}