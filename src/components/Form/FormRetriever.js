import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import JsonForm from './JsonForm';
import * as FormActions from '../../store/Form/actions';
import {Container, Row, Col} from 'react-bootstrap';

const FormRetriever = ({loading, formId, itemId, menu, callBack, retrieveJsonForm, retrieveJsonFormByMenu, retrievedJsonForm, retrievedJsonFormByMenu, ...rest}) =>{
    const [jsonForm, setJsonForm] = useState({});
    const [forms, setForms] = useState([]);
    const [currentForm, setCurrentForm] = useState(0);
    const [identifier, setIdentifier] = useState(-1);

    useEffect(() =>{
        if(rest.identifier !== -1){
            setIdentifier(rest.identifier);

            retrieveJsonFormByMenu(itemId, menu, rest.identifier);
        }
    }, [rest.identifier]);

    useEffect(()=>{
        if(formId !== undefined)
            retrieveJsonForm(formId);
    }, [formId]);

    useEffect(()=>{
         setJsonForm(retrievedJsonForm);
    }, [retrievedJsonForm]);

    useEffect(() =>{
        if(identifier !== -1 && retrievedJsonFormByMenu[0]){
            setForms(retrievedJsonFormByMenu);
            
            //setting up the first form to automatically show the form when there's more than one form
            setCurrentForm(retrievedJsonFormByMenu[0].form_config.form_id);
        }
    }, [retrievedJsonFormByMenu, identifier]);

    if(loading)
        return (
            <center>
                <div className={`col-md-12 text-center showIt`}>
                    <div className="top a1"></div>
                    <div className="top a2"></div>
                    <div className="top a3"></div>
                    <div className="top a4"></div>
                </div>
            </center>
        );
    else if(formId !== undefined)
        return(
            <JsonForm formId={formId} form={jsonForm} developMode={false} identifier={identifier} callBack={callBack} setIdentifier={setIdentifier}/>
        )
    else{
        if(forms.length === 1){
            return(
                forms.map(form => {
                    return  <JsonForm key={form.form_config.form_id} formId={form.form_config.form_id} form={form} developMode={false} identifier={rest.identifier} callBack={callBack} setIdentifier={setIdentifier}/>
                }
                )
            );
        }
        
        return(
            <Container fluid={true}>
                    <Row>
                        <Col md="12">
                            <div className="step-container">
                                <ul className="step-progressbar">
                                    {
                                        forms.map((form) => 
                                            <li key={form.form_config.form_id} onClick={() => setCurrentForm(form.form_config.form_id)} className={form.form_config.form_id <= currentForm ? "active" : ""}>
                                                {form.form_config.form_name}
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md="12">
                            {
                                forms.map(form =>
                                        <div key={form.form_config.form_id} className={currentForm === form.form_config.form_id ? "" : "hideIt"}>
                                            <JsonForm formId={form.form_config.form_id} form={form} developMode={false} identifier={identifier} callBack={callBack} setIdentifier={setIdentifier}/>
                                        </div>
                                )
                            }
                        </Col>
                    </Row>
            </Container>
        );
    }
}

const MapStateToProps = state =>{
    return{
        retrievedJsonForm: state.forms.retrievedJsonForm,
        retrievedJsonFormByMenu: state.forms.retrievedJsonFormByMenu,
        loading : state.forms.loading
    }
}

const MapDispatchToProps = dispatch =>{
    return{
        retrieveJsonForm: (formId) =>{
            dispatch(FormActions.retrieveJsonFormRequest(formId));
        },
        retrieveJsonFormByMenu: (itemId, menu, identifier) =>{
            dispatch(FormActions.retrieveJsonFormByMenuRequest(itemId, menu, identifier));
        }
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(FormRetriever);