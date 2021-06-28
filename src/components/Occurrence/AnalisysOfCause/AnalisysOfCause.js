import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Row, Col, Button, ButtonGroup} from 'react-bootstrap';
import { Alert } from '../../Common/SweetAlert';
import * as AnalisysOfCauseActions from '../../../store/Occurrence/AnalisysOfCause/actions';

const AnalisysOfCause = (
    {
        loading, identifier, analisys_of_cause_state, getAnalisysOfCauseRequest, getAnalisysOfCauseSubjectsRequest, subjects, analisysOfCause, lesson_learned,analisysOfCauseSaveRequest, included,
        numberOfRows
    }) =>{
    const [form, setState] = useState({});
    const [rows, setRows] = useState(1);
    const [lessonLearned, setLessonLearned] = useState("");
    
    useEffect(()=>{
        getAnalisysOfCauseSubjectsRequest();
    }, []);

    useEffect(() =>{
        setState(analisysOfCause);
        setRows(numberOfRows);
        setLessonLearned(lesson_learned);
    }, [analisysOfCause, numberOfRows]);

    useEffect(()=>{
        if(identifier && identifier !== -1)
            getAnalisysOfCauseRequest(identifier);
    }, [identifier]);

    useEffect(() =>{
        if(included && included.show){
            Alert({
                title: "Analisys Of Cause",
                text: included.message,
                type: included.success ? 1 : 3
            });

            analisys_of_cause_state("included", {...included, show: false});
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
                                <Col md={2} key={`${subject.whySubjectId}_${i}`}>
                                    <Form.Group controlId={`why_${subject.whySubjectId}_${i}`}>
                                        <Form.Label>Why</Form.Label>
                                        <Form.Control type="text" data-index={i} name={subject.whySubjectId} onChange={updateField} value={getValueFromState(i, subject.whySubjectId)}/>
                                    </Form.Group>
                                </Col>
                            )}
                        </Row>);
        }

        return returnRows;
    }

    const handleSubmit = event =>{
        event.preventDefault();

        let whyList = [];

        for(let i = 0; i < rows; i++){
            let line = form[i];

            subjects.forEach(subject =>{
                let answer = line[subject.whySubjectId];

                whyList.push({
                    whySubjectId: subject.whySubjectId,
                    whyAnswer: answer ?? "",
                    rowNumber: i
                })
            });
        }

        if(identifier && identifier !== -1){
            let data = {
                eventId: parseInt(identifier),
                ListWhy: whyList,
                lessonLearned: lessonLearned
            };

            analisysOfCauseSaveRequest(data);

        }
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
                                <Col md={2} key={subject.whySubjectId}>
                                    <h6>{subject.whySubjectName}</h6>
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
                <Col md={6}>
                    <Form.Group controlId="lessonLearnedDescription">
                        <Form.Label>Lesson learned</Form.Label>
                        <Form.Control as="textarea" rows="3" name="lessonLearnedDescription" onChange={(e) => setLessonLearned(e.target.value)} defaultValue={lessonLearned}/>
                    </Form.Group>
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
        subjects: state.analisysOfCause.subjects,
        analisysOfCause: state.analisysOfCause.data,
        lesson_learned: state.analisysOfCause.lessonLearned,
        included: state.analisysOfCause.included,
        numberOfRows: state.analisysOfCause.numberOfRows,
        loading: state.analisysOfCause.loading
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        analisys_of_cause_state: (node, value)=>{
            dispatch(AnalisysOfCauseActions.analisys_of_cause_state(node, value));
        },
        getAnalisysOfCauseRequest: (eventId) =>{
            dispatch(AnalisysOfCauseActions.getAnalisysOfCauseRequest(eventId));
        },
        getAnalisysOfCauseSubjectsRequest: () =>{
            dispatch(AnalisysOfCauseActions.getAnalisysOfCauseSubjectsRequest());
        },
        analisysOfCauseSaveRequest: (data) =>{
            dispatch(AnalisysOfCauseActions.analisysOfCauseSaveRequest(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalisysOfCause);