import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Initial from './Initial/Initial';
import LostDays from './lostDays/LostDays';
import Investigation from './Investigation/Investigation';
import AnalisysOfCause from './AnalisysOfCause/AnalisysOfCause';
import PreventiveAndCorrective from './PreventiveAndCorrective/PreventiveAndCorrective';

const Occurrence = ({identifier, callBack}) =>{
    const [step, setStep] = useState(0);
    const [currentOccurrenceId, setCurrentOccurrenceId] = useState(undefined);

    useEffect(() => {
        setCurrentOccurrenceId(identifier);
    }, [identifier]);

    useEffect(()=>{
        if(currentOccurrenceId){
            callBack();
        }
    }, [currentOccurrenceId]);

    const handleChangeStep = (step) =>{
        if(!currentOccurrenceId)
            setStep(0);
        else{
            setStep(step);
        }
    }

    return(
        <Container fluid={true}>
            <Row>
                <Col md="3">
                    <h5>Occurrence Number: {currentOccurrenceId}</h5>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <div className="step-container">
                        <ul className="step-progressbar">
                            <li onClick={() => handleChangeStep(0)} className={0 <= step ? "active" : ""}>
                                Initial
                            </li>
                            <li onClick={() => handleChangeStep(1)} className={1 <= step ? "active" : ""}>
                                Lost Days
                            </li>
                            <li onClick={() => handleChangeStep(2)} className={2 <= step ? "active" : ""}>
                                Investigation
                            </li>
                            <li onClick={() => handleChangeStep(3)} className={3 <= step ? "active" : ""}>
                                Analisys of cause
                            </li>
                            <li onClick={() => handleChangeStep(4)} className={4 <= step ? "active" : ""}>
                                Preventive and corrective actions
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col md="12">
                    <div className={step === 0 ? "" : "hideIt"}>
                        <Initial identifier={currentOccurrenceId} setCurrentOccurrenceId={setCurrentOccurrenceId}/>
                    </div>
                    <div className={step === 1 ? "" : "hideIt"}>
                        <LostDays identifier={currentOccurrenceId} setCurrentOccurrenceId={setCurrentOccurrenceId}/>
                    </div>
                    <div className={step === 2 ? "" : "hideIt"}>
                        <Investigation identifier={currentOccurrenceId} setCurrentOccurrenceId={setCurrentOccurrenceId}/>
                    </div>
                    <div className={step === 3 ? "" : "hideIt"}>
                        <AnalisysOfCause identifier={currentOccurrenceId} setCurrentOccurrenceId={setCurrentOccurrenceId}/>
                    </div>
                    <div className={step === 4 ? "" : "hideIt"}>
                        <PreventiveAndCorrective identifier={currentOccurrenceId} setCurrentOccurrenceId={setCurrentOccurrenceId}/>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}

export default Occurrence;

