import React, {Component} from 'react';
import image from '../../assets/img/default-img.png';

export default class Img extends Component{
    constructor(){
        super();

        this.state = {
            failed: false
        };
    }

    _onError = () => {
        this.setState({failed : true});
    }

    render(){
        const defaultImg =  <img alt="Custom" src={image} height={this.props.height}  width={this.props.width} className={this.props.className}/>

        if(this.state.failed) return defaultImg;

        return(
            <img alt="Custom" {...this.props} onError={this._onError}/>
        );
    }
}