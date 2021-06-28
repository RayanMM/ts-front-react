import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Checkbox extends Component{
    constructor(props){
        super(props);
        this.state = {checked: 0};
    }

    handleChecked(){
        this.setState({checked: !this.state.checked});
    }

    componentWillReceiveProps(nextProps){
        this.setState({checked: nextProps.checked === 1 ? true : false});
    }

    render(){
        return(
            <div className="input-group">
                <span className="input-group-addon">
                    <FontAwesomeIcon icon={this.props.icon} size={this.props.iconSize}></FontAwesomeIcon>
                </span>

                <div className="form-group">
                    <input id={this.props.id} name={this.props.name} type="checkbox" className={this.props.className} onChange={this.handleChecked.bind(this)} onClick={this.props.onClick} checked={this.state.checked}/>
                    {this.props.label}
                </div>
            </div>
        );
    }
}