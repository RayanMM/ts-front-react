import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Container, Row, Col, Button} from 'react-bootstrap';
import * as OccurrenceActions from '../../../store/Occurrence/Initial/actions';
import { Alert } from '../../Common/SweetAlert';
import JwtDecode from '../../../common/jwtDecode';
import SelectSearch from 'react-select-search';
import {INITIAL_STATE} from '../../../store/Occurrence/Initial/index';

const Initial = (
        {
            loading, occurrence_state, current_state, identifier, setCurrentOccurrenceId, getOccurrenceClassificationList, gotOccurrenceClassificationList, getOccurrenceTypeListRequest, gotOccurrenceTypeList, getOccurrenceJobListRequest,
            gotOccurrenceJobList, facilityListRequest, facilityList, departamentListRequest, departamentList, contractTypeListRequest, contractTypeList, outsourcedListRequest,
            outsourcedList, happenedGroupListRequest, happenedGroupList, happenedListRequest, happenedList, includeOccurrenceRequest, occurrenceInclusion, getOccurrenceRequest,
            editOccurrenceRequest, updated
            }
        ) =>{

    const [occurrenceId, setOccurrenceId] = useState(0);
    const [classificationList, setClassificationList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [jobList, setJobList] = useState([]);
    const [facility, setFacility] = useState([]);
    const [departament, setDepartament] = useState([]);
    const [contract, setContract] = useState([]);
    const [outsourced,setOutsourced ] = useState([]);
    const [happenedGroup, setHappenedGroup] = useState([]);
    const [happened, setHappened] = useState([]);
    const [form, setState] = useState(INITIAL_STATE.current_state);

    useEffect(() =>{
        getOccurrenceClassificationList();
        getOccurrenceTypeListRequest();
        getOccurrenceJobListRequest();
        facilityListRequest();
        departamentListRequest();
        contractTypeListRequest();
        outsourcedListRequest();
        happenedGroupListRequest();
    }, []);

    useEffect(()=>{
        if(form.happenedGroupId)
            happenedListRequest(form.happenedGroupId);
    }, [form.happenedGroupId]);

    useEffect(() => {
        if(identifier !== 0 && identifier){
            setOccurrenceId(identifier);
            getOccurrenceRequest(identifier);
        }
    }, [identifier]);

    useEffect(()=>{
        if(occurrenceId !== 0 && occurrenceId)
            setState(current_state);
    }, [current_state, occurrenceId]);

    useEffect(() =>{
        if(Array.isArray(gotOccurrenceClassificationList))
            setClassificationList(gotOccurrenceClassificationList);
    }, [gotOccurrenceClassificationList]);

    useEffect(()=>{
        setTypeList(gotOccurrenceTypeList);
    }, [gotOccurrenceTypeList]);

    useEffect(()=> {
        setJobList(gotOccurrenceJobList);
    }, [gotOccurrenceJobList]);

    useEffect(()=>{
        setFacility(facilityList);
    }, [facilityList]);

    useEffect(()=>{
        setDepartament(departamentList);
    }, [departamentList]);

    useEffect(()=>{
        setContract(contractTypeList);
    }, [contractTypeList]);

    useEffect(()=>{
        setOutsourced(outsourcedList);
    }, [outsourcedList]);

    useEffect(()=>{
        setHappenedGroup(happenedGroupList);
    }, [happenedGroupList]);

    useEffect(()=> {
        setHappened(happenedList);
    }, [happenedList]);

    useEffect(()=>{
        if(occurrenceInclusion.show){
            Alert({
                title: "Occurrence Inclusion",
                text: occurrenceInclusion.message,
                type: occurrenceInclusion.success ? 1 : 3
            });

            setOccurrenceId(occurrenceInclusion.occurrenceId);
            
            setCurrentOccurrenceId(occurrenceInclusion.occurrenceId);

            occurrence_state("occurrenceInclusion", {...occurrenceInclusion, show: false});
        }
    }, [occurrenceInclusion]);

    useEffect(() =>{
        if(updated.show){
            Alert({
                title: "Occurrence Edition",
                text: updated.message,
                type: updated.success ? 1 : 3
            });

            occurrence_state("updated", {...updated, show: false});
        }
    }, [updated]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        let parsedData = {
            ...form,
            dateTimeStamp: form.dateTimeStamp === "" ? null : form.dateTimeStamp,
            userId: parseInt(JwtDecode.getUserId()),
            contractTypeId: parseInt(form.contractTypeId),
            departamentId: parseInt(form.departamentId),
            facilityId: parseInt(form.facilityId),
            happenedGroupId: parseInt(form.happenedGroupId),
            happenedId: parseInt(form.happenedId),
            occupationId: parseInt(form.occupationId),
            occurrenceClassificationId: parseInt(form.occurrenceClassificationId),
            occurrenceTypeId: parseInt(form.occurrenceTypeId),
            outSourcedCompaniesId: parseInt(form.outSourcedCompaniesId),
            userDepartamentId: parseInt(form.userDepartamentId),
        };

        occurrence_state("current_state", parsedData);

        if(occurrenceId === 0 || !occurrenceId)
            includeOccurrenceRequest(parsedData);
        else{
            editOccurrenceRequest({...parsedData, eventId: parseInt(occurrenceId)});
        }
    }

    const updateField = e => {
        setState({
          ...form,
          [e.target.name]: e.target.value
        });
    };
    
    const updateSelectField = (value, targerItem) => {
        setState({
          ...form,
          [targerItem]: value === -1 ? null : value
        });
    };
    
    return(
        <Form onSubmit={handleSubmit}>
            <Container fluid={true}>
                <Row>
                    <Col md="12">
                        <fieldset>
                            <legend>Type and classification</legend>
                            <Row>
                                <Col md="3">
                                    <Form.Group controlId="occurrenceClassificationId">
                                        <Form.Label>Classification</Form.Label>
                                        <SelectSearch search emptyMessage="Not found" options={classificationList} value={form.occurrenceClassificationId} name="occurrenceClassificationId" placeholder="Choose the classification" onChange={(e) => updateSelectField(e, "occurrenceClassificationId")}/>
                                    </Form.Group>
                                </Col>
                                <Col md="3">
                                    <Form.Group controlId="occurrenceTypeId">
                                        <Form.Label>Type</Form.Label>
                                        <SelectSearch search emptyMessage="Not found" options={typeList} value={form.occurrenceTypeId} name="occurrenceTypeId" placeholder="Choose the type" onChange={(e) => updateSelectField(e, "occurrenceTypeId")}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <fieldset>
                            <legend>Initial identification</legend>
                            <Row>
                                <Col md="3">
                                    <Form.Group controlId="eventIdentification">
                                        <Form.Label>Identification Number/Id</Form.Label>
                                        <Form.Control type="text" name="eventIdentification" onChange={updateField} defaultValue={form.eventIdentification}/>
                                    </Form.Group>
                                </Col>
                                <Col md="5">
                                    <Form.Group controlId="eventInjuredPersonName">
                                        <Form.Label>Full name</Form.Label>
                                        <Form.Control type="text" name="eventInjuredPersonName" onChange={updateField} defaultValue={form.eventInjuredPersonName}/>
                                    </Form.Group>
                                </Col>
                                <Col md="2">
                                    <Form.Group controlId="occupationId">
                                        <Form.Label>Job Title</Form.Label>
                                        <SelectSearch search emptyMessage="Not found" options={jobList} value={form.occupationId} name="occupationId" placeholder="Choose the occupation" onChange={(e) => updateSelectField(e, "occupationId")}/>
                                    </Form.Group>
                                </Col>
                                <Col md="2">
                                    <Form.Group controlId="facilityId">
                                        <Form.Label>Facility/Filial</Form.Label>
                                        <SelectSearch search emptyMessage="Not found" options={facility} value={form.facilityId} name="facilityId" placeholder="Choose the facility" onChange={(e) => updateSelectField(e, "facilityId")}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="3">
                                    <Form.Group controlId="departamentId">
                                        <Form.Label>Employee Area</Form.Label>
                                        <SelectSearch search emptyMessage="Not found" options={departament} value={form.departamentId} name="departamentId" placeholder="Choose the departament" onChange={(e) => updateSelectField(e, "departamentId")}/>
                                    </Form.Group>
                                </Col>
                                <Col md="3">
                                    <Form.Group controlId="eventSupervisorName">
                                        <Form.Label>Supervisor name</Form.Label>
                                        <Form.Control type="text" name="eventSupervisorName" onChange={updateField} value={form.eventSupervisorName}/>
                                    </Form.Group>
                                </Col>
                                <Col md="3">
                                    <Form.Group controlId="contractTypeId">
                                        <Form.Label>Contract Type</Form.Label>
                                        <SelectSearch search emptyMessage="Not found" options={contract} value={form.contractTypeId} name="contractTypeId" placeholder="Choose the contract type" onChange={(e) => updateSelectField(e, "contractTypeId")}/>
                                    </Form.Group>
                                </Col>
                                <Col md="3">
                                    <Form.Group controlId="outSourcedCompaniesId">
                                        <Form.Label>Outsourced company</Form.Label>
                                        <SelectSearch search emptyMessage="Not found" options={outsourced} value={form.outSourcedCompaniesId === null || parseInt(!form.contractTypeId ? 0 : form.contractTypeId) < 2 ? 0 : form.outSourcedCompaniesId} disabled={parseInt(!form.contractTypeId ? 0 : form.contractTypeId) < 2} name="outSourcedCompaniesId" placeholder="Choose the outsourced company" onChange={(e) => updateSelectField(e, "outSourcedCompaniesId")}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <fieldset>
                            <legend>Initial information</legend>
                            <Row>
                                <Col md="6">
                                    <Row>
                                        <Col md="12">
                                            <Form.Group controlId="dateTimeStamp">
                                                <Form.Label>Occurrence's date/hour</Form.Label>
                                                <Form.Control type="datetime-local" name="dateTimeStamp" onChange={updateField} value={form.dateTimeStamp}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group controlId="userDepartamentId">
                                                <Form.Label>Departament where occurrence happened</Form.Label>
                                                <SelectSearch search emptyMessage="Not found" options={departament} value={form.userDepartamentId} name="userDepartamentId" placeholder="Choose the departament" onChange={(e) => updateSelectField(e, "userDepartamentId")}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group controlId="happenedGroupId">
                                                <Form.Label>What happened</Form.Label>
                                                <SelectSearch search emptyMessage="Not found" options={happenedGroup} value={form.happenedGroupId} name="happenedGroupId" placeholder="Choose the reason" onChange={(e) => {
                                                    updateSelectField(e, "happenedGroupId");
                                                    happenedListRequest(e);
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group controlId="happenedId">
                                                <Form.Label>What happened (Details)</Form.Label>
                                                    <SelectSearch search emptyMessage="Not found" options={happened} value={form.happenedId} name="happenedId" placeholder="Choose the detail" onChange={(e) => updateSelectField(e, "happenedId")}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="6">
                                    <Row>
                                        <Col md="12">
                                            <Form.Group controlId="eventDescription">
                                                <Form.Label>Occurrence's description</Form.Label>
                                                <Form.Control as="textarea" rows="3" name="eventDescription" onChange={updateField} value={form.eventDescription}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group controlId="eventActions">
                                                <Form.Label>Immediate taken actions</Form.Label>
                                                <Form.Control as="textarea" rows="3" name="eventActions" onChange={updateField} value={form.eventActions}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </fieldset>
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
    );
}

const MapStateToProps = state =>{
    return{
        current_state: state.occurrence.current_state,
        gotOccurrenceClassificationList: state.occurrence.gotOccurrenceClassificationList,
        gotOccurrenceTypeList: state.occurrence.gotOccurrenceTypeList,
        gotOccurrenceJobList: state.occurrence.gotOccurrenceJobList,
        facilityList: state.occurrence.facilityList,
        departamentList: state.occurrence.departamentList,
        contractTypeList: state.occurrence.contractTypeList,
        outsourcedList:  state.occurrence.outsourcedList,
        happenedGroupList: state.occurrence.happenedGroupList,
        happenedList: state.occurrence.happenedList?? [],
        occurrenceInclusion: state.occurrence.occurrenceInclusion,
        updated: state.occurrence.updated,
        loading: state.occurrence.loading
    }
};

const MapDispatchToProps = dispatch =>{
    return{
        occurrence_state: (node, value)=>{
            dispatch(OccurrenceActions.OccurrenceState(node, value))
        },
        getOccurrenceClassificationList: () =>{
            dispatch(OccurrenceActions.getOccurrenceClassificationListRequest());
        },
        getOccurrenceTypeListRequest: () =>{
            dispatch(OccurrenceActions.getOccurrenceTypeListRequest());
        },
        getOccurrenceJobListRequest: () =>{
            dispatch(OccurrenceActions.getOccurrenceJobListRequest());
        },
        facilityListRequest : () =>{
            dispatch(OccurrenceActions.facilityListRequest());
        },
        departamentListRequest : () =>{
            dispatch(OccurrenceActions.departamentListRequest());
        },
        contractTypeListRequest : () =>{
            dispatch(OccurrenceActions.contractTypeListRequest());
        },
        outsourcedListRequest : () =>{
            dispatch(OccurrenceActions.outsourcedListRequest());
        },
        happenedGroupListRequest : () =>{
            dispatch(OccurrenceActions.happenedGroupListRequest());
        },
        happenedListRequest : (happenedGroupId) =>{
            dispatch(OccurrenceActions.happenedListRequest(happenedGroupId));
        },
        includeOccurrenceRequest: (data) =>{
            dispatch(OccurrenceActions.includeOccurrenceRequest(data));
        },
        getOccurrenceRequest: (eventId) =>{
            dispatch(OccurrenceActions.getOccurrenceRequest(eventId));
        },
        editOccurrenceRequest: (data) =>{
            dispatch(OccurrenceActions.editOccurrenceRequest(data));
        }
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Initial);