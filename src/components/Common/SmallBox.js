import React, {Component} from 'react';

export default class SmallBox extends Component{
    getIcon(iconSource, icon){
        return <i className={`${iconSource === 0 ?"ion" : "fa"} ${icon}`}></i>
    }
    
    render(){
        return(
            this.props.items.map(item =>
                <div key={item.key} className="col-lg-3 col-xs-6">
                    <div className={`small-box ${item.bg_color}`}>
                        <div className="inner">
                        <h3>{item.mainInfo}</h3>

                        <p>{item.title}</p>
                        </div>
                        <div className="icon">
                            {this.getIcon(item.iconSource, item.icon)}
                        </div>
                        <a href="#" className="small-box-footer">Ver mais <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            )
        )
    }
}