import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Input2 extends Component{
    render(){
        return(
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        <FontAwesomeIcon icon={this.props.icon} size={this.props.iconSize}></FontAwesomeIcon>
                    </span>
                </div>
                {this.props.children}
            </div>
        );
    }
}