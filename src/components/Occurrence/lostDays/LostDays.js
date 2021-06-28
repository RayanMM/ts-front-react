import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Container, Col, Row, Button} from 'react-bootstrap';
import { Alert } from '../../Common/SweetAlert';
import * as OccurrenceActions from '../../../store/Occurrence/Initial/actions';

const LostDays = ({loading, current_state, identifier, occurrence_state, editOccurrenceRequest, updated}) =>{
    const [form, setState] = useState({});

    useEffect(()=>{
        if(identifier !== 0 && identifier)
            setState(current_state);
    }, [current_state, identifier]);

    useEffect(() =>{
        if(updated.show){
            Alert({
                title: "Lost days Edition",
                text: updated.message,
                type: updated.success ? 1 : 3
            });

            occurrence_state("updated", {...updated, show: false});
        }
    }, [updated]);

    const handleSubmit = (event)=>{
        event.preventDefault();

        let parsedData = {
            eventId: parseInt(identifier),
            ...form
        };
        
        if(identifier !== 0 && identifier)
            editOccurrenceRequest(parsedData);
    }

    
    const updateField = e => {
        setState({
          ...form,
          [e.target.name]: e.target.value
        });
    };

    return(
        <Form onSubmit={handleSubmit}>
            <Container fluid={true}>
                <Row>
                    <Col md={2}>
                        <Form.Group controlId="absenceDateTimeIni">
                            <Form.Label>Absence begin</Form.Label>
                            <Form.Control type="date" name="absenceDateTimeIni" onChange={updateField} defaultValue={form.absenceDateTimeIni}/>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="absenceDateTimeEnd">
                            <Form.Label>Absence end</Form.Label>
                            <Form.Control type="date" name="absenceDateTimeEnd" onChange={updateField} defaultValue={form.absenceDateTimeEnd}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br/>
                        <Button type="submit" variant="info" className="float-right" disabled={loading}>{loading ? "Wait..." : "Save draft"}</Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

const mapStateToProps = state =>{
    return{
        current_state: state.occurrence.current_state,
        updated: state.occurrence.updated,
        loading: state.occurrence.loading
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        occurrence_state: (node, value)=>{
            dispatch(OccurrenceActions.OccurrenceState(node, value))
        },
        editOccurrenceRequest: (data) =>{
            dispatch(OccurrenceActions.editOccurrenceRequest(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LostDays);