import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileExcel, faChartBar } from '@fortawesome/free-solid-svg-icons';
import {Container, Row, Col, Table, Form, Pagination, Button} from 'react-bootstrap';
import * as ReportActions from '../../../store/Report/actions';
import CustomModal from '../CustomModal';
import FormRetriever from '../../Form/FormRetriever';
import Occurrence from '../../Occurrence/Occurrence';
import {connect} from 'react-redux';

function DataDrivenDataTable (props){
  const [striped, setStriped] = useState(true);
  const [bordered, setBordered] = useState(true);
  const [hover, setHover] = useState(true);
  const [size, setSize] = useState("sm");
  const [variant, setVariant] = useState("default");
  const [numberOfRows, setNumberOfRows] = useState(15);
  const [currentPage, setCurrentPage]= useState(0);
  const [data, setData] = useState({});
  const [maxPage, setMaxPage] = useState(0);
  const [filter, setFilter] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [lineIdentifier, setLineIdentifier] = useState(-1);
  const [dataHasChanged, setDataHasChanged] = useState({changed: false, key: 0});
  const isMounted = useRef(false);
  const types = {
    occurrence: Occurrence
  };

useEffect(() =>{
    props.retriveReportResultByMenu(props.itemId, props.menu, currentPage, numberOfRows, filter);
  }, []);

  useEffect(() =>{
    if(props.striped !== undefined)
      setStriped(props.striped);
    
    if(props.bordered !== undefined)
      setBordered(props.bordered);
    
    if(props.hover !== undefined)
      setHover(props.hover);

    if(props.size !== undefined)
      setSize(props.size);

    if(props.variant !== undefined)
      setVariant(props.variant);

    if(props.updatedData.changed && props.updatedData.key !== dataHasChanged.key){
      callBack();
      setDataHasChanged({changed: props.updatedData.changed, key: props.updatedData.key});
    }

  }, [props]);

  useEffect(()=>{
    props.setModalSize(props.reportObject.includeEditModalSize);
    setData(props.reportObject);
    setMaxPage(props.reportObject.maxPage);
  }, [props.reportObject]);
  
  useEffect(() =>{
        if(isMounted.current){
            props.retriveReportResultByMenu(props.itemId, props.menu, currentPage, numberOfRows, filter);
        }else
            isMounted.current = true;
        
  }, [currentPage, numberOfRows, filter]);

  useEffect(() =>{
      if(lineIdentifier !== -1)
        setShowEdit(true);
  }, [lineIdentifier]);

  useEffect(() =>{
    if(!showEdit)
      setLineIdentifier(-1);

  }, [showEdit]);

  const nextOrPrev = (next) =>{
    if(currentPage === 0 && !next)
        setCurrentPage(maxPage);
    else if(currentPage === maxPage && next){
        setCurrentPage(0);
    }else{
        if(next)
            setCurrentPage(currentPage + 1);
        else
            setCurrentPage(currentPage - 1);
    }
  }

  const orderBy= (ev, columnId) =>{
    if(ev.target.classList.contains("orderDesc"))
    {
      ev.target.classList.remove("orderDesc");
      ev.target.classList.add("orderAsc");
    }else{
      ev.target.classList.add("orderDesc");
      ev.target.classList.remove("orderAsc");
    }
  }

  const onChange = (e) =>{
        
    let value = {...filter};
    let queryField = e.target.dataset.field;

    value[queryField] = e.target.value;

    setFilter(value);
  }

  const callBack = () =>{
    props.retriveReportResultByMenu(props.itemId, props.menu, currentPage, numberOfRows, filter);
  }

  const getComponent = () =>{
    const $component = types[props.component];

    if(props.useComponent){
      return <$component identifier={lineIdentifier} callBack={callBack}/>
    }
    else
      return <FormRetriever itemId={props.itemId} menu={props.menu} identifier={lineIdentifier} callBack={callBack}/>
  }

  return(
    <Container fluid={true}>
      <br/>
      <Row className="hideIt">
        <Col>
          <Form.Group>
            <Form.Check checked={striped} onChange={() => setStriped(!striped)} label="Striped"></Form.Check>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Check checked={bordered} onChange={() => setBordered(!bordered)} label="Bordered"></Form.Check>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Check checked={hover} onChange={() => setHover(!hover)} label="Hover"></Form.Check>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Check checked={size === "sm" ? true : false} onChange={() => setSize(size === "sm" ? "md" : "sm")} label="Size small"></Form.Check>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Check checked={variant === "default" ? true : false} onChange={() => setVariant(variant === "default" ? "dark" : "default")} label="Variant default"></Form.Check>
          </Form.Group>
        </Col>
      </Row>
      <Row>
          <Col sm={{span:8, offset: 9}}>
              <Form.Group as={Row}>
                <Form.Label column sm="2">Show</Form.Label>
                <Col sm={3}>
                  <Form.Control as="select" onChange={(ev) => setNumberOfRows(ev.target.value)}>
                    <option value="15">15</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="-1">All</option>
                  </Form.Control>
                </Col>
              </Form.Group>
          </Col>
      </Row>
      <Row>
        <Col md={12} className="getmaxHeight">
          <Table striped={striped} bordered={bordered} hover={hover} size={size} variant={variant}>
            <thead>
                <tr>
                  {
                      data.header ? 
                        data.header.headerInfo.map(header =>
                            <th onClick={(ev) => orderBy(ev, 1)} key={header.header}>{header.header}</th>
                        )
                        :
                        <th></th>
                  }
                </tr>
                <tr>
                    {
                      data.header ? 
                        data.header.headerInfo.map(header =>
                            {
                              if(header.showFilter)
                                return <th key={header.queryField}><Form.Control size="sm" type="text" maxLength={255} data-field={header.queryField} onChange={(e) => onChange(e)}/></th>;
                              else
                                return <th key={header.queryField}>#</th>;
                            }
                        )
                        :
                        <th></th>
                    }
                </tr>
              </thead>
              <tbody>
                    {
                        data.body ?
                        data.body.rows.map((row, index) =>
                            <tr key={index}>
                                {
                                    row.columns.map((column,index) =>
                                       {
                                         if(column.columnType === 1)
                                          return(<td key={index} className="centered-datatable"><Button variant="warning" onClick={() => setLineIdentifier(column.columnValue)}>Edit</Button></td>);
                                         else
                                          return(<td key={index}>{column.columnValue}</td>);
                                         
                                       }  
                                    )
                                }
                            </tr>
                        ) : <tr></tr>
                    }
              </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div className="float-right">
          <FontAwesomeIcon icon={faChartBar} className="chart" size="1x"/> <FontAwesomeIcon icon={faFilePdf} className="pdf" size="1x"/> <FontAwesomeIcon icon={faFileExcel} className="excel" size="1x"/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
            <div className="centered-datatable">
                <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(0)}/>
                    <Pagination.Prev onClick={() => nextOrPrev(false)}/>
                    {
                        data.pagination ? 
                            data.pagination.map(page =>
                                <Pagination.Item key={page} onClick={() => setCurrentPage(page)} active={currentPage === page ? true : false}>{page+1}</Pagination.Item>
                            )
                        :""
                    }
                    <Pagination.Next onClick={() => nextOrPrev(true)}/>
                    <Pagination.Last onClick={() => setCurrentPage(maxPage)}/>
                </Pagination>
          </div>
        </Col>        
      </Row>
      <CustomModal show={showEdit} dialogClassName={data.includeEditModalSize} title={`Editing ${props.title}`} onClick={() => setShowEdit(!showEdit)}>
        {
          getComponent()
        }
      </CustomModal>
    </Container>
  );
}

const mapStateToProps = state =>{
    return{
        reportObject: state.report.reportObject
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        retriveReportResultByMenu: (menusubMenuId, menu, page, show, filter)=>{
            dispatch(ReportActions.retrieveReportResultByMenuRequest(menusubMenuId, menu, page, show,filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDrivenDataTable);
