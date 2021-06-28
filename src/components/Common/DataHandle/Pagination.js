import React, {Component} from 'react';

export default class Pagination extends Component{
    constructor(props){
        super(props);
        this.state=({pages: 0, current: 0});
    }

    componentWillReceiveProps(nextProps){
        this.setState({pages: Math.ceil(nextProps.dataLength/nextProps.itensPerPage), current: nextProps.currentPage});
    }

    updateCurrentPage(page){
        if(page < 0)
            page = this.state.pages - 1;
        else if(page > (this.state.pages - 1))
            page = 0;

        this.setState({current: page});

        this.props.callBack(page);
    }

    render(){
        let items = [];
        for(var x=0; x<this.state.pages; x++){
            items.push(
                <li key={`Pagination${x}`} className={this.state.current === x ? 'page-item active' : 'page-item'} onClick={this.updateCurrentPage.bind(this,x)}>
                    <a className="page-link" href="#">{x+1}</a>
                </li>
            );
        }

        return (
            <div className="col-md-12">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous" onClick={this.updateCurrentPage.bind(this,this.state.current-1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {items}                    
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next" onClick={this.updateCurrentPage.bind(this,this.state.current+1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            );
    }
}