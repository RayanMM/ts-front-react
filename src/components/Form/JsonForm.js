import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import * as FormActions from '../../store/Form/actions';
import { Alert } from '../Common/SweetAlert';

function JsonForm ({includeOrUpdateFormData, includedOrUpdatedFormData, identifier, setIdentifier, callBack, form_state, ...rest}){
    const [formData, setFormData] = useState({});
    const [formJson, setFormJson] = useState({});
    const [developMode, setDevelopMode] = useState(false);
    const [idSuf, setIdSuf] = useState("Prod");

    useEffect(() =>{
        setFormJson(rest.form);
        setDevelopMode(rest.developMode);
        setIdSuf(rest.developMode ? "Dev" : "Prod");
    }, [identifier, rest.form]);
    

    useEffect(() => {
        if(includedOrUpdatedFormData.messageType){
            Alert({
                title: "Total Safe",
                text: includedOrUpdatedFormData.message,
                type: includedOrUpdatedFormData.messageType
            });

            setIdentifier(includedOrUpdatedFormData.identifier);
            
            form_state("includedOrUpdatedFormData", {});
            
            callBack();
        }
    }, [includedOrUpdatedFormData]);

    const handleSubmit = (event) =>{
        event.preventDefault();

        let json = {};
        json["formId"] = rest.formId;
        json["identifier"] = identifier;
        json["data"] = formData;

        includeOrUpdateFormData(json);
    }

    const onChange = (e, key, parent) =>{
        
        let value = formData;
        let formItemId = e.target.dataset.formitemid;
        let newKey = `${key}.${formItemId}`;

        switch(e.target.type){
            case "checkbox":
                if(parent !== undefined){
                    parent = `${parent}.${formItemId}`;

                    let parentValues = value[parent] === undefined ? {} : value[parent];

                    parentValues[key] = e.target.checked ? true : false;

                    value[parent] = parentValues;
                }
                else
                    value[newKey] = e.target.checked ? true : false;
                break;
            case "select-one":
                value[newKey] = e.target.value;
                break;
            default :
                value[newKey] = e.target.value;
        }

        setFormData(value);
    }

    const drop = (ev) =>{
        ev.stopPropagation();
        if(developMode)
            rest.drop(ev);
    }

    const allowDrop = (ev) =>{
        ev.stopPropagation();
        if(developMode)
            rest.allowDrop(ev);
    }

    const removeBackGround = (ev) =>{
        ev.stopPropagation();
        if(developMode)
            rest.removeBackGround(ev);
    }

    const click = (ev) =>{
        ev.stopPropagation();
        if(developMode){
            let formItemId =ev.target.dataset.formitemid; 
            rest.openProperties(formItemId);
        }
        
    }

    const dragStart = (ev) =>{
        if(developMode){
            rest.dragStart(ev);
        }
    }

    const mountForm = (data) =>{
        let model = data !== undefined ? data : (!formJson.form_fields ? [] : formJson.form_fields.items);

        let formUi = model.map(form=>{
            if(form.itemContext === 0) //Container Rows and Cols
                return(
                    <div key={form.itemId} id={`${form.itemId}`} data-formitemid={form.itemId} data-componentid={form.itemComponentId} className={`${developMode ? "editing" : ""} ${form.itemClassName}`} onDrop={(ev) => drop(ev)} onDragOver={(ev) => allowDrop(ev)} onDragLeave={(ev) => removeBackGround(ev)} onClick={(ev) => click(ev)} draggable={developMode ? true : false} onDragStart={(ev) => dragStart(ev)}>
                        {form.itemChildren.length > 0 ? mountForm(form.itemChildren) : ""}
                    </div>
                );
            else if(form.itemContext === 1) //Means that our item is an input
                return(
                    <div key={form.itemId} className="form-group" data-formitemid={form.itemId} onClick={(ev) => click(ev)} data-componentid={form.itemComponentId} draggable={developMode ? true : false} onDragStart={(ev) => dragStart(ev)}>
                        <label htmlFor={`input${form.itemId}_${idSuf}`} data-formitemid={form.itemId}>{form.itemLabel}</label>
                        <input type={form.itemType} className={form.itemClassName} data-formitemid={form.itemId} id={`input${form.itemId}_${idSuf}`} placeholder={form.itemPlaceholder} required={form.itemRequired} maxLength={form.itemMaxLength} defaultValue={form.itemDefaultValue} onChange={(e) => onChange(e, form.itemTableField)}/>
                    </div>
                );
            else if(form.itemContext === 2) //Means that it's a select input
                    if(form.itemSubContext === 2.1)
                        return(
                            <div key={form.itemId} className="form-group" data-formitemid={form.itemId} onClick={(ev) => click(ev)} data-componentid={form.itemComponentId} draggable={developMode ? true : false} onDragStart={(ev) => dragStart(ev)}>
                                <label htmlFor={`input${form.itemId}_${idSuf}`} data-formitemid={form.itemId}>{form.itemLabel}</label>
                                <select type={form.itemType} className={form.itemClassName} data-formitemid={form.itemId} id={`input${form.itemId}_${idSuf}`} defaultValue={form.itemDefaultValue} onChange={(e) => onChange(e, form.itemTableField)}>
                                    {form.itemChildren.length > 0 ? mountForm(form.itemChildren) : ""}
                                </select>
                            </div>
                        );
                    else
                        return(<option key={form.itemId} value={form.itemId}>{form.itemLabel}</option>);
            else if(form.itemContext === 3) //Means that we have a checkbox or a radio button
                return(
                    <div key={form.itemId} className="form-group form-check-inline" data-formitemid={form.itemId} onClick={(ev) => click(ev)} data-componentid={form.itemComponentId} draggable={developMode ? true : false} onDragStart={(ev) => dragStart(ev)}>
                        <input type={form.itemType} name={form.itemName} className={`form-check-input ${form.itemClassName}`} data-formitemid={form.itemId} id={`input${form.itemId}_${idSuf}`} defaultChecked={form.itemDefaultValue !== ""  && form.itemDefaultValue !== null ? (form.itemDefaultValue === "False" ? false : true) : form.itemChecked} onChange={(e) => onChange(e, form.itemTableField)} value={form.itemId}/>
                        <label htmlFor={`input${form.itemId}_${idSuf}`} data-formitemid={form.itemId} className="form-check-label">{form.itemLabel}</label>
                    </div>
                );
            else if(form.itemContext === 4)
                return(
                    <div key={form.itemId} className="form-group" data-formitemid={form.itemId} onClick={(ev) => click(ev)} data-componentid={form.itemComponentId} draggable={developMode ? true : false} onDragStart={(ev) => dragStart(ev)}>
                        <label htmlFor={`textarea${form.itemId}_${idSuf}`} data-formitemid={form.itemId}>{form.itemLabel}</label>
                        <textarea className={form.itemClassName} data-formitemid={form.itemId} id={`textarea${form.itemId}_${idSuf}`} placeholder={form.itemPlaceholder} required={form.itemRequired} maxLength={form.itemMaxLength} row={form.itemRowNumber} defaultValue={form.itemDefaultValue} onChange={(e) => onChange(e, form.itemTableField)}/>
                    </div>
                );
            else if(form.itemContext === 5){
                if(form.itemSubContext === 5.1){
                    return(
                        <fieldset key={form.itemId} data-formitemid={form.itemId} onClick={(ev) => click(ev)} data-componentid={form.itemComponentId} draggable={developMode ? true : false} onDragStart={(ev) => dragStart(ev)}>
                            <legend>{form.itemLabel}</legend>
                            {form.itemChildren.length > 0 ? mountForm(form.itemChildren) : ""}
                        </fieldset>
                    );
                }else{
                    return(
                        <div key={form.itemId} className="form-group form-check-inline">
                            <input type={form.itemType} name={form.itemName} className={`form-check-input ${form.itemClassName}`} data-formitemid={form.itemParentId} id={`inputGroup${form.itemType}${form.itemId}_${idSuf}`} defaultChecked={form.itemDefaultValue !== "" && form.itemDefaultValue !== null ? (form.itemDefaultValue === "False" ? false : true) : form.itemChecked} onChange={(e) => onChange(e, form.itemId, form.itemTableField)} value={form.itemId}/>
                            <label htmlFor={`inputGroup${form.itemType}${form.itemId}_${idSuf}`} data-formitemid={form.itemParentId} className="form-check-label">{form.itemLabel}</label>
                        </div>
                    );
                }
            }else if(form.itemContext === 6){
                return (
                    <fieldset key={form.itemId} id={`${form.itemId}`} data-formitemid={form.itemId} data-componentid={form.itemComponentId} onDrop={(ev) => drop(ev)} onDragOver={(ev) => allowDrop(ev)} onDragLeave={(ev) => removeBackGround(ev)} onClick={(ev) => click(ev)} draggable={developMode ? true : false} onDragStart={(ev) => dragStart(ev)}>
                        <legend>{form.itemLabel}</legend>
                        {form.itemChildren.length > 0 ? mountForm(form.itemChildren) : ""}
                    </fieldset>
                );
            }
                return(
                    <div  key={form.itemId} className="alert alert-primary" role="alert">
                        Invalid componentEntry
                    </div>
                );
        });

        return formUi;
    }

    return(
        <form onSubmit={handleSubmit.bind(this)}>
            {
                mountForm()
            }
            <br/>
            {
                !developMode ? 
                <button type="submit" className="btn btn-info float-right">Send</button>
                :
                ""
            }
        </form>
    );
}

const mapStateToProps = state =>{
    return{
        includedOrUpdatedFormData: state.forms.includedOrUpdatedFormData
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        form_state: (node, key, value) => {
            dispatch(FormActions.formState(node,key, value));
        },
        includeOrUpdateFormData: (json) =>{
            dispatch(FormActions.includeOrUpdateFormDataRequest(json));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JsonForm);