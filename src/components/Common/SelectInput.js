import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SelectInput extends Component{
    constructor(){
        super();
        this.state = {value: 0};
    }

    handleChecked(event){
        this.setState({value: event.target.value});
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value});
    }

    render(){
        return(
            <div className="input-group">
                <div className="form-group">
                    <select className="form-control input-lg" id={this.props.id} name={this.props.name} onChange={this.handleChecked.bind(this)} value={this.state.value} onClick={this.props.onChange}>
                        {this.props.Options.map(
                            option => <option key={option.id} value={option.id}>{option.label}</option>
                        )}
                    </select>
                </div>
                <span className="input-group-addon">
                    <FontAwesomeIcon icon={this.props.icon} size={this.props.iconSize}></FontAwesomeIcon>
                </span>
            </div>
        );
    }
}