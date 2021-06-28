import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ConfigTab extends Component{
    render(){
        return(
            <li>
                <a href="#" data-toggle="control-sidebar">
                    <FontAwesomeIcon icon="cogs"></FontAwesomeIcon>
                </a>
            </li>
        )
    }
}