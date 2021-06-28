import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {connect} from 'react-redux';
import * as FormActions from '../../store/Form/actions';
import {Form} from 'react-bootstrap';

const FormItemProperty = ({retrieveJsonForm,formItemId, formItemProperties, gotFormItemProperties, updatePropertyValue, updatedPropertyValue, formId, ...rest}) =>{
    const [properties, setProperties] = useState([]);
    const [currentFormId, setCurrentFormId] = useState(0);

    useEffect(() =>{
        if(formItemId)
            formItemProperties(formItemId);
    }, [formItemId]);

    useEffect(()=>{
        setCurrentFormId(formId);
    }, [formId]);

    useEffect(()=>{
        setProperties(gotFormItemProperties);
    }, [gotFormItemProperties]);

    useEffect(() =>{
        if(currentFormId && currentFormId > 0 && updatedPropertyValue)
            retrieveJsonForm(currentFormId);
    }, [updatedPropertyValue]);

    const changeValue = (e, propertyId) =>{
        let value = "";

        switch(e.target.type){
            case "checkbox":
                value = e.target.checked ? true : false;
                break;
            case "select-one":
                value = e.target.value;
                break;
            default :
                value = e.target.value;
        }

        updatePropertyValue(propertyId, value);
    }

    return(
        <Container fluid={true}>
            {
                properties.map(property =>{
                    if(property.propertyType ==="bool")
                        return (
                            <Form.Group key={property.formItemPropertyId}>
                                <Form.Label>
                                    {property.propertyName}
                                </Form.Label>
                                <div key={`inline-radio`} className="mb-2">
                                <Form.Check inline label="Yes" type="radio" value="1" name={property.formItemPropertyId} onChange={(e) => changeValue(e, property.formItemPropertyId)} defaultChecked={property.formItemValue === "1" ? true : false}/>
                                <Form.Check inline label="No" type="radio" value="0" name={property.formItemPropertyId} onChange={(e) => changeValue(e, property.formItemPropertyId)} defaultChecked={property.formItemValue === "0" || property.formItemValue === "" ? true : false}/>
                            </div>
                            </Form.Group>
                        );

                    return(
                        <Form.Group key={property.formItemPropertyId}>
                            <Form.Label>
                                {property.propertyName}
                            </Form.Label>
                            <Form.Control type={property.propertyType} onBlur={(e) => changeValue(e, property.formItemPropertyId)} defaultValue={property.formItemValue}/>
                        </Form.Group>
                    );
                })
            }
        </Container>
    );
}

const mapStateToProps = state =>{
    return{
        gotFormItemProperties: state.forms.formItemProperties,
        updatedPropertyValue: state.forms.updatedPropertyValue,
        loading: state.forms.loading
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        formItemProperties:(formItemId) =>{
            dispatch(FormActions.getFormItemPropertiesRequest(formItemId));
        },
        updatePropertyValue: (propertyId, value) =>{
            dispatch(FormActions.updatePropertyValueRequest(propertyId, value));
        },
        retrieveJsonForm: (formId) =>{
            dispatch(FormActions.retrieveJsonFormRequest(formId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormItemProperty);