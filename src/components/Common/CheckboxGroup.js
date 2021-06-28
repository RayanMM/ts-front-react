import React, {Component} from 'react';

export default class CheckboxGroup extends Component{
    constructor(){
        super();
        this.state = ({items: [], col: 3});
    }

    componentWillReceiveProps(nextProps){
        let items = [];
        
        nextProps.items.map(item =>
            items.push(item)
        );

        this.setState({items: items, col: nextProps.col === null || nextProps.col === undefined ? 3 : nextProps.col});
    }


    refactoryItems(event){
        let checked = event.target.checked ? 1 : 0;
        let id = event.target.id;
        
        let items = this.state.items;

        for(let i=0; i< items.length; i++)
        {
            if(parseInt(items[i].Id) === parseInt(id)){
                let newValue = {
                    Id: id,
                    Label: items[i].Label,
                    Associated: checked
                }

                this.props.callBack(newValue);

                items[i] = newValue;

                this.setState({items: items});
            }
        }
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    {
                        this.state.items.map(item =>
                            <div className={`col-md-${this.state.col}`} key={item.Id}>
                                <div>
                                    <input type="checkbox" id={item.Id} nome={item.MinifiedLabel === null || item.MinifiedLabel === undefined || item.MinifiedLabel === "" ? item.Label : item.MinifiedLabel} onClick={this.refactoryItems.bind(this)} defaultChecked={item.Associated === 1 ? true : false}/>
                                    <label htmlFor={item.id}>&nbsp;{item.MinifiedLabel === null || item.MinifiedLabel === undefined || item.MinifiedLabel === "" ? item.Label : item.MinifiedLabel}</label>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}