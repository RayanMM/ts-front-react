import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import { Alert } from '../../Common/SweetAlert';
import * as PreventiveAndCorrectiveActions from '../../../store/Occurrence/PreventiveAndCorrective/actions';

const PreventiveAndCorrective = (
    {
        loading, identifier, preventive_corrective_state, getPcRequest, getPcSubjectsRequest, subjects, preventiveAndCorrective, preventiveAndCorrectiveSaveRequest, included,
        numberOfRows
    }) =>{
    const [form, setState] = useState({});
    const [rows, setRows] = useState(1);
    
    useEffect(()=>{
        getPcSubjectsRequest();
    }, []);

    useEffect(() =>{
        setState(preventiveAndCorrective);
        setRows(numberOfRows);
    }, [preventiveAndCorrective, numberOfRows]);

    useEffect(()=>{
        if(identifier && identifier !== -1)
            getPcRequest(identifier);
    }, [identifier]);

    useEffect(() =>{
        if(included && included.show){
            Alert({
                title: "Analisys Of Cause",
                text: included.message,
                type: included.success ? 1 : 3
            });

            preventive_corrective_state("included", {...included, show: false});
        }
    }, [included]);

    const updateField = e => {
        setState({
          ...form,
          [e.target.dataset.index]: {...form[e.target.dataset.index], [e.target.name]: e.target.value}
        });
    };

    const addRemoveRows = (increment) =>{
        if(increment)
            setRows(rows + 1);
        else
            if(rows > 1){
                setRows(rows - 1);
                delete form[(rows - 1)];
            }
            
    }

    const getValueFromState = (line, item) =>{
        let getRow = form[line];
        
        if(getRow)
            return getRow[item];
        
        return "";
    }

    const createRows = () =>{
        let returnRows = [];

        for(let i =0; i<rows; i++){
            returnRows.push(<Row key={i}>
                            {subjects && subjects.map(subject =>
                                <Col key={`${subject.actionSubjectId}_${i}`}>
                                    {
                                        subject.actionSubjectId !== 8 ?
                                        <Form.Group controlId={`preventiveAndCorrective_${subject.actionSubjectId}_${i}`}>
                                            <Form.Control as="textarea" rows="3" data-index={i} name={subject.actionSubjectId} onChange={updateField} defaultValue={getValueFromState(i, subject.actionSubjectId)} autoComplete="false"/>
                                        </Form.Group>
                                        :
                                        <Form.Group controlId={`preventiveAndCorrective_${subject.actionSubjectId}_${i}`}>
                                            <Form.Label>Select the current status</Form.Label>
                                                <Form.Control as="select" data-index={i} name={subject.actionSubjectId} onChange={updateField} value={getValueFromState(i, subject.actionSubjectId)} >
                                                    <option value="0">In progress</option>  
                                                    <option value="1">Ok</option>  
                                                    <option value="2">not Ok</option>   
                                            </Form.Control>
                                        </Form.Group>
                                    }
                                </Col>

                            )}
                        </Row>);
        }

        return returnRows;
    }

    const handleSubmit = event =>{
        event.preventDefault();

        let actionList = [];

        for(let i = 0; i < rows; i++){
            let line = form[i];

            subjects.forEach(subject =>{
                let answer = line[subject.actionSubjectId];

                actionList.push({
                    eventId: parseInt(identifier),
                    actionSubjectId: subject.actionSubjectId,
                    actionName: answer ?? "",
                    rowNumber: i
                })
            });
        }

        if(identifier && identifier !== -1)
            preventiveAndCorrectiveSaveRequest(actionList);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={12}>
                    <fieldset>
                        <legend>Analisys of</legend>
                        <Row>
                            <Col md={4}>
                                <ButtonGroup>
                                    <Button variant="primary" onClick={() => addRemoveRows(true)}>
                                        Add row
                                    </Button>
                                    <Button variant="danger" onClick={() => addRemoveRows(false)} disabled={rows === 1}>
                                        Remove last row
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            {subjects && subjects.map(subject =>
                                <Col key={subject.actionSubjectId}>
                                    <h6>{subject.actionSubjectName}</h6>
                                </Col>
                            )}
                        </Row>
                        {
                            createRows()
                        }
                    </fieldset>
                </Col>
            </Row>
            <Row>
                <Col>
                    <br/>
                    <Button type="submit" variant="info" className="float-right" disabled={loading}>{loading ? "Wait..." : "Save draft"}</Button>
                </Col>
            </Row>
        </Form>
    );
};

const mapStateToProps = state =>{
    return{
        subjects: state.preventiveAndCorrective.subjects,
        preventiveAndCorrective: state.preventiveAndCorrective.data,
        included: state.preventiveAndCorrective.included,
        numberOfRows: state.preventiveAndCorrective.numberOfRows,
        loading: state.preventiveAndCorrective.loading
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        preventive_corrective_state: (node, value)=>{
            dispatch(PreventiveAndCorrectiveActions.preventive_corrective_state(node, value));
        },
        getPcRequest: (eventId) =>{
            dispatch(PreventiveAndCorrectiveActions.getPcRequest(eventId));
        },
        getPcSubjectsRequest: () =>{
            dispatch(PreventiveAndCorrectiveActions.getPcSubjectsRequest());
        },
        preventiveAndCorrectiveSaveRequest: (data) =>{
            dispatch(PreventiveAndCorrectiveActions.preventiveAndCorrectiveSaveRequest(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreventiveAndCorrective);