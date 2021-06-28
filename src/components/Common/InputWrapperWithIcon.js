import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class InputWrapperWithIcon extends Component{
    render(){
        return(
            <div className="input-group">
                {this.props.children}
                <span className="input-group-addon"><FontAwesomeIcon icon={this.props.icon} size={this.props.size}></FontAwesomeIcon></span>
            </div>
        );
    }
}