import React, {Component} from 'react';
import Pagination from './Pagination';
import Img from '../Img';
import '../../../assets/css/dataTable.css';
import Button from '../Button';
import pdf from '../../../assets/img/pdf.png';

class DataTable extends Component{
    constructor(props){
        super(props);
        this.state = ({
            config: [],
            headers : [],
            data: [],
            currentPage: 0,
            totalItems: 0,
            itemsPerPage: 0,
            filter: "", 
            filterBy: "All",
            now: new Date().getMilliseconds()
        })
    }

    componentDidMount(){
        this.fireActions(this.props);
    }
   
    componentWillReceiveProps(nextProps){
        this.fireActions(nextProps);
    }
    
    componentDidUpdate(){
        this.setRowPage();
    }

    setProperties(InputName, event){
        var field = {};
        
        field[InputName] =event.target.value;
        this.setState(field, ()=>{
            if(InputName === "filter" || InputName === "filterBy"){
                this.filterData();
            }
        });
    }

    fireActions(props){
        this.setState({
            config: props.config,
            headers: props.headers,
            data: props.data !== undefined ? props.data : [],
            totalItems: props.data !== undefined ? props.data.length : 0,
            itemsPerPage: props.config !== undefined ? props.config.itemsPerPage : 0
        });
    }
    
    //Callback to Pagination component
    changeCurrentPage(page){
        this.setState({currentPage: page});
    }

    //change items per page according so the selector
    changeItemsPerPage(event){
        event.preventDefault();

        this.setState({
            currentPage: 0,
            itemsPerPage: parseInt(event.target.value)
        });
    }

    //Set whether the row will be shown 
    setRowPage(){
        var table = document.getElementById(`${this.state.config.tableId}_Body`);
        var tr = table.getElementsByTagName("tr");
        for (var i = 0; i < tr.length; i++) {
            let page = parseInt(tr[i].getAttribute("page"));
            if (page === this.state.currentPage){
                tr[i].classList.add("showIt");
                tr[i].classList.remove("hideIt");
            }else {
                tr[i].classList.add("hideIt");
                tr[i].classList.remove("showIt");
            }
        }
    }

    filterData(){

        this.setState({currentPage: 0}, () =>{
        
        let filteredData = [];
        
        let filter = this.state.filter;

        let generalCounter = 1;

        this.props.data.forEach(data =>{
            
            let showThisRow = false;
            
            if(this.state.filterBy === "All"){
                this.state.headers.forEach(header =>{
                    let columnValue = data[header.Target] === null || data[header.Target] === undefined ? "" : data[header.Target].toString().toUpperCase();
                
                    if(columnValue.indexOf(filter.toUpperCase()) > -1){
                        showThisRow =true;
                    }
                });
            }else{
                let columnValue = data[this.state.filterBy] === null || data[this.state.filterBy] === undefined ? "" : data[this.state.filterBy].toString().toUpperCase();
                
                if(columnValue.indexOf(filter.toUpperCase()) > -1){
                    showThisRow =true;
                }
            }

            if(showThisRow){
                filteredData.push(data);
                generalCounter++;
            }
        });       

        this.setState({
            totalItems: generalCounter,
            filter: filter,
            data: filteredData
        });

        });
    }

    clickAction(p_click, p_clickAction, p_parameterData, p_parameterTarget, p_fixedParameter){
        if(p_click){
            let parameters = p_parameterTarget.split(';');

            let DataArray = [];

            parameters.forEach(parameter =>{
                DataArray.push(p_parameterData[parameter.trim()]);
            });

            if(p_fixedParameter !== undefined && p_fixedParameter !== "")
                DataArray.push(p_fixedParameter);

            p_clickAction(DataArray);
        }
    }

    handleData(){
        var page = 0;
        var items = 1;
        var counter = 1;
        var rows = [];
        this.state.data.forEach(
            data => { 
                    rows.push(
                        <tr 
                            key={data[this.state.config.idReference]} 
                            page={page} 
                            className={`hideIt datatablehover ${this.state.config.rowColor ? data[this.state.config.rowColorTarget] : ""}`} 
                            onClick={() => this.clickAction(this.state.config.rowClick, this.state.config.clickAction,data, this.state.config.ParameterTarget, this.state.config.FixedParameter)}
                        >
                            <td>{counter}</td>
                            {
                                this.state.headers.map(
                                        header =>
                                            <td 
                                                key={header.Column} 
                                                className={header.columnClick ? "cursorpointer" : ""} 
                                                onClick={() => this.clickAction(header.columnClick, header.clickAction,data, header.ParameterTarget, header.FixedParameter)}
                                            >
                                                {
                                                    header.Type === 'photo' ? 
                                                        <Img src={data[header.Target].toString().toLowerCase().includes(".pdf")? pdf : `${data[header.Target]}?now${this.state.now}`} height="50px" width="50px" className="img-raised cursorpointer"></Img> 
                                                    : 
                                                    header.Type === "button" ?
                                                        <Button type="button" className={`btn btn-${header.btnColor} btn-sm`} value={header.btnFixedText !== undefined ? header.btnFixedText: data[header.Target]}></Button>
                                                    : 
                                                        data[header.Target]
                                                }
                                            </td>
                                    )
                            }
                        </tr>
                        );

                        if(items !== this.state.itemsPerPage){
                            items++;
                        }else{
                            items = 1;
                            page++;
                        }

                        counter++;
                    }
        );

        return rows;
    }

    render(){
        return(
            <div className="getmaxHeight">
                <div className="row">
                    <div className="col-md-6 col-sm-3 pull-left">
                        <div className="form-group is-empty text-center">
                        <input  className="form-control" type="text" value={this.state.filter} onChange={this.setProperties.bind(this, "filter")}/>
                            <label htmlFor="filter">Filter</label>
                            <span className="material-input"></span>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3">
                        <div className="form-group is-empty text-center">
                            <select id="filterBy" className="form-control" value={this.state.filterBy} onChange={this.setProperties.bind(this, "filterBy")}>
                                <option value="All">All</option>
                                {
                                    this.state.headers.map(
                                        header => <option key={header.Target} value={header.Target}>{header.Column}</option>
                                    )
                                }
                            </select>
                            <label htmlFor="itemsPerPage">Specific filter</label>
                            <span className="material-input"></span>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 pull-right">
                        <div className="form-group is-empty text-center">
                            <select id="itemsPerPage" className="form-control" value={this.state.itemsPerPage} onChange={this.changeItemsPerPage.bind(this)}>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <label htmlFor="itemsPerPage">Items por página</label>
                            <span className="material-input"></span>
                        </div>
                    </div>
                </div>
                <br/>
                <table id={this.state.config.tableId} className="table table-bordered table-striped">
                    <thead> 
                        <tr>
                            <th>#</th>
                            {
                                this.state.headers.map(
                                    header => <th key={header.Column}>{header.Column}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody id={`${this.state.config.tableId}_Body`}>
                        {
                           this.handleData()
                        }
                    </tbody>
                </table>
                <div className="row">
                    <Pagination  dataLength={this.state.totalItems} itensPerPage={this.state.itemsPerPage} currentPage ={this.state.currentPage} callBack={(page) => this.changeCurrentPage(page)}></Pagination>
                </div>
            </div>
        );
    }
}

export default DataTable;