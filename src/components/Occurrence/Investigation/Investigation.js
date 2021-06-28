import React,{useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Form, Container, Row, Col, Button} from 'react-bootstrap';
import { Alert } from '../../Common/SweetAlert';
import SelectSearch from 'react-select-search';
import * as InvestigationActions from '../../../store/Occurrence/Investigation/actions';
import BodyParts from './BodyParts';

const Investigation = (
        {
            loading, investigation_state, identifier, current_state, yes_no_options, yes_no_na_options, weatherConditionRequest, weatherCondition, roadConditionRequest, roadCondition, 
            vehicleTypeRequest ,vehicleType, stateListRequest, stateList, getInvestigationRequest, updateInvestigationRequest, updated, selectedBodyParts,positionTimeRequest, positionTime,
            getBodyPartsRequest, namedBodyParts
        }) =>{
    const [form, setState] = useState({});
    const [namedParts, setNamedParts] = useState([]);
    
    useEffect(() =>{
        weatherConditionRequest(); 
        roadConditionRequest();
        vehicleTypeRequest();
        stateListRequest();
        positionTimeRequest();
        getBodyPartsRequest();
    }, []);

    useEffect(()=>{
        if(identifier && identifier !== -1)
            getInvestigationRequest(identifier);
    }, [identifier]);

    useEffect(() =>{
        setState(current_state);
    }, [current_state]);

    useEffect(() =>{
        if(updated.show){
            Alert({
                title: "Investigation Edition",
                text: updated.message,
                type: updated.success ? 1 : 3
            });

            investigation_state("updated", {...updated, show: false});
        }
    }, [updated]);

    useEffect(() =>{

        let partNames = [];

        selectedBodyParts.forEach(part =>{
            namedBodyParts.forEach(named =>{
                if(named.bodyPartId === part)
                    partNames.push(named.bodyPartName);
            });
        });

        setNamedParts(partNames);

    }, [selectedBodyParts]);

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

    const handleSubmit = (e) =>{
        e.preventDefault();

        let body = [];

        if(selectedBodyParts)
        {
            selectedBodyParts.forEach(part =>{
                body.push({
                    eventId: parseInt(identifier),
                    bodyPartId: parseInt(part),
                    isActive: true
                });
            });
        }

        let parsedData = {
            investigation: {
                investigationUseVehicle: form.investigationUseVehicle === 1 ? true : false,
                investigationId: form.investigationId,
                eventId: parseInt(identifier),
                investigationDriverName: form.investigationDriverName,
                investigationDriverLicense: form.investigationDriverLicense,
                investigationLicenseDueDate: form.investigationLicenseDueDate,
                investigationLicenseEmissionCountry: form.investigationLicenseEmissionCountry,
                investigationLicenseEmissionState: form.investigationLicenseEmissionState,
                investigationLastTrainingDefensiveDriving: form.investigationLastTrainingDefensiveDriving,
                investigationVehicleLastInspection: form.investigationVehicleLastInspection,
                investigationOccupantsComments: form.investigationOccupantsComments,
                conditionsRoadId: parseInt(form.conditionsRoadId),
                conditionsWeatherId: parseInt(form.conditionsWeatherId),
                vehicleTypeId: parseInt(form.vehicleTypeId),
                investigationDriverDistracted: parseInt(form.investigationDriverDistracted),
                investigationDriverDisturbed: parseInt(form.investigationDriverDisturbed),
                investigationDriverSafetyBelt: parseInt(form.investigationDriverSafetyBelt),
                investigationDriverSleep: parseInt(form.investigationDriverSleep),
                investigationDriverTrainned: parseInt(form.investigationDriverTrainned),
                investigationIsCompanyVehicle: parseInt(form.investigationIsCompanyVehicle),
                investigationIsDriverAllowed: parseInt(form.investigationIsDriverAllowed),
                investigationOccupantsSafetyBelt: parseInt(form.investigationOccupantsSafetyBelt),
                investigationRealSpeed: parseInt(form.investigationRealSpeed),
                investigationSpeedLimit: parseInt(form.investigationSpeedLimit),
                investigationVehicleMaintenance: parseInt(form.investigationVehicleMaintenance),
                investigationVehicleNPassengers: parseInt(form.investigationVehicleNPassengers),
                investigationVehiclePlaces: parseInt(form.investigationVehiclePlaces),
                investigationVehicleSafetyBelt: parseInt(form.investigationVehicleSafetyBelt),
                investigationVehicleYear: parseInt(form.investigationVehicleYear),
                investigationLoadWeight: parseFloat(form.investigationLoadWeight),
                investigationUseDefensiveDriving: parseInt(form.investigationUseDefensiveDriving)
            },
            task: {
              taskId: form.taskId,
              eventId: parseInt(identifier),
              taskExecuted: form.taskExecuted,
              taskLastTraining: form.taskLastTraining,
              taskWichSimilarSituations: form.taskWichSimilarSituations,
              taskAction: form.taskAction,
              taskImprovement: form.taskImprovement,
              taskTimeFunctionId: 1,//parseInt(form.taskTimeFunctionId),
              taskAble: parseInt(form.taskAble),
              taskIsRightTool: parseInt(form.taskIsRightTool),
              taskIsStandardized: parseInt(form.taskIsStandardized),
              taskSimilarSituations: parseInt(form.taskSimilarSituations)
            },
            bodyParts: body
          }

        if(identifier !== 0 && identifier)
            updateInvestigationRequest(parsedData);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Container fluid={true}>
                <Row>
                    <Col md={3}>
                        <fieldset>
                            <legend>Vehicle Accident</legend>
                            <Row>
                                <Col md={12}>
                                    <div key={`inline-radio`}>
                                        <Form.Check inline label="Yes" type="radio" id="inline-radio-yes" name="investigationUseVehicle" value={1} onChange={updateField} checked={parseInt(form.investigationUseVehicle) === 1 ? true : false}/>
                                        <Form.Check inline label="No" type="radio" id="inline-radio-no" name="investigationUseVehicle" value={0} onChange={updateField} checked={parseInt(form.investigationUseVehicle) === 0 ? true : false}/>
                                    </div>
                                </Col>
                            </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <fieldset disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}>
                            <legend>Driver info</legend>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="investigationDriverName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" name="investigationDriverName" onChange={updateField} defaultValue={form.investigationDriverName}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationDriverLicense">
                                            <Form.Label>License number</Form.Label>
                                            <Form.Control type="text" name="investigationDriverLicense" onChange={updateField} defaultValue={form.investigationDriverLicense}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationLicenseDueDate">
                                            <Form.Label>Expire date</Form.Label>
                                            <Form.Control type="date" name="investigationLicenseDueDate" onChange={updateField} defaultValue={form.investigationLicenseDueDate}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="investigationLicenseEmissionState">
                                            <Form.Label>Emission state</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={stateList} value={form.investigationLicenseEmissionState} name="investigationLicenseEmissionState" placeholder="Choose the state" onChange={(e) => updateSelectField(e, "investigationLicenseEmissionState")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="investigationLastTrainingDefensiveDriving">
                                            <Form.Label>Last defensive drive training</Form.Label>
                                            <Form.Control type="date" name="investigationLastTrainingDefensiveDriving" onChange={updateField} defaultValue={form.investigationLastTrainingDefensiveDriving}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <fieldset>
                                            <legend>Was the driver enabled to this type of vehicle</legend>
                                            <Row>
                                                <Col md={12}>
                                                    <div key={`inline-radio`}>
                                                        <Form.Check inline label="Yes" type="radio" id="investigationIsDriverAllowed-yes" name="investigationIsDriverAllowed" value={1} onChange={updateField} checked={parseInt(form.investigationIsDriverAllowed) === 1}/>
                                                        <Form.Check inline label="No" type="radio" id="investigationIsDriverAllowed-no" name="investigationIsDriverAllowed" value={0} onChange={updateField} checked={parseInt(form.investigationIsDriverAllowed) === 0}/>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </fieldset>
                                    </Col>
                                </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <fieldset disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}>
                            <legend>Vehicle Info</legend>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationIsCompanyVehicle">
                                            <Form.Label>Company's vehicle</Form.Label>
                                            <SelectSearch options={yes_no_options} value={form.investigationIsCompanyVehicle} name="investigationIsCompanyVehicle" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationIsCompanyVehicle")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="VehicleTypeId">
                                            <Form.Label>Vehicle's type</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={vehicleType} value={form.vehicleTypeId} name="vehicleTypeId" placeholder="Choose the vehicle type" onChange={(e) => updateSelectField(e, "vehicleTypeId")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationVehicleYear">
                                            <Form.Label>Vehicle's year</Form.Label>
                                            <Form.Control type="number" name="investigationVehicleYear" onChange={updateField} defaultValue={form.investigationVehicleYear}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <Form.Group controlId="investigationVehiclePlaces">
                                            <Form.Label>How many seats</Form.Label>
                                            <Form.Control type="number" name="investigationVehiclePlaces" onChange={updateField} defaultValue={form.investigationVehiclePlaces}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group controlId="investigationVehicleSafetyBelt">
                                            <Form.Label>Available seatbelt</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.investigationVehicleSafetyBelt} name="investigationVehicleSafetyBelt" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationVehicleSafetyBelt")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationVehicleLastInspection">
                                            <Form.Label>Last inspection</Form.Label>
                                            <Form.Control type="date" name="investigationVehicleLastInspection" onChange={updateField} defaultValue={form.investigationVehicleLastInspection}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <fieldset disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}>
                            <legend>Accident info</legend>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationVehicleNPassengers">
                                            <Form.Label>How many occupants</Form.Label>
                                            <Form.Control type="number" name="investigationVehicleNPassengers" onChange={updateField} defaultValue={form.investigationVehicleNPassengers}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationDriverSafetyBelt">
                                            <Form.Label>Driver seatbelt put on</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.investigationDriverSafetyBelt} name="investigationDriverSafetyBelt" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationDriverSafetyBelt")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationOccupantsSafetyBelt">
                                            <Form.Label>Occupants seatbelt put on</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.investigationOccupantsSafetyBelt} name="investigationOccupantsSafetyBelt" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationOccupantsSafetyBelt")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationDriverTrainned">
                                            <Form.Label>Was the driver trainned</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.investigationDriverTrainned} name="investigationDriverTrainned" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationDriverTrainned")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationVehicleMaintenance">
                                            <Form.Label>Has the vehicle been on maintenance</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.investigationVehicleMaintenance} name="investigationVehicleMaintenance" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationVehicleMaintenance")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationUseDefensiveDriving">
                                            <Form.Label>Safe conditions followed</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.investigationUseDefensiveDriving} name="investigationUseDefensiveDriving" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationUseDefensiveDriving")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationDriverDisturbed">
                                            <Form.Label>Was the driver disturbed by others</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.investigationDriverDisturbed} name="investigationDriverDisturbed" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationDriverDisturbed")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationDriverDistracted">
                                            <Form.Label>Was the driver distracted</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.investigationDriverDistracted} name="investigationDriverDistracted" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationDriverDistracted")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationDriverSleep">
                                            <Form.Label>Did the driver sleep on the wheel</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.investigationDriverSleep} name="investigationDriverSleep" placeholder="Choose" onChange={(e) => updateSelectField(e, "investigationDriverSleep")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationSpeedLimit">
                                            <Form.Label>Speed limit</Form.Label>
                                            <Form.Control type="number" name="investigationSpeedLimit" onChange={updateField} defaultValue={form.investigationSpeedLimit}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationRealSpeed">
                                            <Form.Label>Real speed at the time</Form.Label>
                                            <Form.Control type="number" name="investigationRealSpeed" onChange={updateField} defaultValue={form.investigationRealSpeed}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="investigationLoadWeight">
                                            <Form.Label>Load weight</Form.Label>
                                            <Form.Control type="text" name="investigationLoadWeight" onChange={updateField} defaultValue={form.investigationLoadWeight}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group controlId="ConditionsWeatherId">
                                            <Form.Label>Conditions of the weather</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={weatherCondition} value={form.conditionsWeatherId} name="conditionsWeatherId" placeholder="Choose the wheather condition" onChange={(e) => updateSelectField(e, "conditionsWeatherId")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="ConditionsRoadId">
                                            <Form.Label>Conditions of the road</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={roadCondition} value={form.conditionsRoadId} name="conditionsRoadId" placeholder="Choose the road condition" onChange={(e) => updateSelectField(e, "conditionsRoadId")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="investigationOccupantsComments">
                                            <Form.Label>Comments about the occupants</Form.Label>
                                            <Form.Control as="textarea" rows="3" name="investigationOccupantsComments" onChange={updateField} defaultValue={form.investigationOccupantsComments}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <fieldset>
                            <legend>Task info</legend>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="taskIsStandardized">
                                            <Form.Label>Was the process padronized</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.taskIsStandardized} name="taskIsStandardized" placeholder="Choose" onChange={(e) => updateSelectField(e, "taskIsStandardized")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="taskAble">
                                            <Form.Label>Was the person properly trainned to do the task</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.taskAble} name="taskAble" placeholder="Choose" onChange={(e) => updateSelectField(e, "taskAble")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="taskIsRightTool">
                                            <Form.Label>Was properly tool used</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.taskIsRightTool} name="taskIsRightTool" placeholder="Choose" onChange={(e) => updateSelectField(e, "taskIsRightTool")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={7}>
                                        <Form.Group controlId="taskSimilarSituations">
                                            <Form.Label>Is there any similar/equal equipaments, componentes or situations that could it happen</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={yes_no_na_options} value={form.taskSimilarSituations} name="taskSimilarSituations" placeholder="Choose" onChange={(e) => updateSelectField(e, "taskSimilarSituations")} disabled={parseInt(form.investigationUseVehicle) === 1 ? false : true}/> 
                                        </Form.Group>
                                    </Col>
                                    <Col md={5}>
                                        <Form.Group controlId="taskWichSimilarSituations">
                                            <Form.Label>If so, which</Form.Label>
                                            <Form.Control type="text" name="taskWichSimilarSituations" onChange={updateField} defaultValue={form.taskWichSimilarSituations}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="taskAction">
                                            <Form.Label>If so, immediate action taken</Form.Label>
                                            <Form.Control type="text" name="taskAction" onChange={updateField} defaultValue={form.taskAction}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="taskImprovement">
                                            <Form.Label>What must the individual or leadership do different next time and why</Form.Label>
                                            <Form.Control type="text" name="taskImprovement" onChange={updateField} defaultValue={form.taskImprovement}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="taskExecuted">
                                            <Form.Label>task being executed at the moment</Form.Label>
                                            <Form.Control type="text" name="taskExecuted" onChange={updateField} defaultValue={form.taskExecuted}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="taskTimeFunctionId">
                                            <Form.Label>How many time is the employee on this position</Form.Label>
                                            <SelectSearch search emptyMessage="Not found" options={positionTime} value={form.taskTimeFunctionId} name="taskTimeFunctionId" placeholder="Choose the position" onChange={(e) => updateSelectField(e, "taskTimeFunctionId")}/> 
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="taskLastTraining">
                                            <Form.Label>Last training</Form.Label>
                                            <Form.Control type="date" name="taskLastTraining" onChange={updateField} defaultValue={form.taskLastTraining}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <fieldset>
                            <legend>Affected body parts</legend>
                            <Row className="justify-content-md-center">
                                <Col md={6}>
                                    <BodyParts/>
                                </Col>
                                <Col md={3}>
                                    <ul>
                                        {
                                            namedParts.map(part =>
                                                <li>{part}</li>
                                            )
                                        }
                                    </ul>
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
    )
}

const mapStateToProps = state =>{
    return{
        yes_no_options: state.investigation.yes_no_options,
        yes_no_na_options: state.investigation.yes_no_na_options,
        weatherCondition: state.investigation.weatherCondition,
        roadCondition: state.investigation.roadCondition,
        vehicleType: state.investigation.vehicleType,
        stateList: state.investigation.stateList,
        current_state: state.investigation.current_state,
        updated: state.investigation.updated,
        selectedBodyParts: state.investigation.selectedBodyParts,
        positionTime: state.investigation.positionTime,
        loading: state.investigation.loading,
        namedBodyParts: state.investigation.namedBodyParts
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        investigation_state: (node, value)=>{
            dispatch(InvestigationActions.investigation_state(node, value));
        },
        weatherConditionRequest: () =>{
            dispatch(InvestigationActions.weatherConditionRequest());
        },
        roadConditionRequest: () =>{
            dispatch(InvestigationActions.roadConditionRequest());
        },
        vehicleTypeRequest: () =>{
            dispatch(InvestigationActions.vehicleTypeRequest());
        },
        stateListRequest: () =>{
            dispatch(InvestigationActions.stateListRequest());
        },
        getInvestigationRequest: (eventId) =>{
            dispatch(InvestigationActions.getInvestigationRequest(eventId));
        },
        updateInvestigationRequest: (data) =>{
            dispatch(InvestigationActions.updateInvestigationRequest(data));
        },
        positionTimeRequest: () =>{
            dispatch(InvestigationActions.positionTimeRequest());
        },
        getBodyPartsRequest: ()=>{
            dispatch(InvestigationActions.getBodyPartsRequest());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Investigation);