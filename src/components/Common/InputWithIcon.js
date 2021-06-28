import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class InputWithIcon extends Component{
    render(){
        return(
            <div className="input-group">
                <input id={this.props.id} name={this.props.name}  type={this.props.type} className={`form-control input-lg ${this.props.classes}`} placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.props.onChange} pattern={this.props.pattern} maxLength={this.props.maxLength} required={this.props.required} readOnly={this.props.readOnly} />
                <span className="input-group-addon"><FontAwesomeIcon icon={this.props.icon} size={this.props.size}></FontAwesomeIcon></span>
            </div>
        );
    }
}