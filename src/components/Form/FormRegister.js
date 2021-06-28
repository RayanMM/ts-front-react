import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {Container, Col, Row, ListGroup, Button, Form, InputGroup} from 'react-bootstrap';
import * as FormActions from '../../store/Form/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormItemProperty from './FormItemProperty';
import JsonForm from './JsonForm';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import CustomModal from '../Common/CustomModal';
import FormRetriever from './FormRetriever';

const FormRegister = ({getFormList, getFormComponents, gotFormComponents, getFormInfo, gotFormInfo,includeForm, includedForm, updateFormName, updatedFormName, includeFormItem, includedFormItem, retrieveJsonForm, retrievedJsonForm, updateFormItemParent, updatedFormItemParent, removeFormItem, removedFormItem,getTableList,gotTableList, getFormGroupList, gotFormGroupList, includeFormTable, associateFormToGroup, ...rest}) =>{
    const [formComponents, setFormComponents] = useState([]);
    const [showNewGroup, setShowNewGroup] = useState(false);
    const [showGrid, setShowGrid] = useState(true);
    const [showPropertiesDrawer, setShowPropertiesDrawer] = useState(false);
    const [formItemId, setFormItemId] = useState(0);
    const [visible, setVisible] = useState(false);
    const [formName, setFormName] = useState("");
    const [formId, setFormId] = useState(null);
    const [jsonForm, setJsonForm] = useState({});
    const [tableList, setTableList] = useState([]);
    const [formGroupList, setFormGroupList] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
    const [formGroup, setFormGroup] = useState(0);

    useEffect(() => {
        setFormId(rest.formId);

        getTableList();

        getFormGroupList();

        getFormComponents();
    }, []);

    useEffect(() =>{
        if(formId !== null){
            retrieveJsonForm(formId);

            getFormInfo(formId);
        }
    }, [formId]);

    useEffect(() => {
        setFormComponents(gotFormComponents);
    }, [gotFormComponents]);

    useEffect(() => {
        setFormName(gotFormInfo.formName === null ? "" : gotFormInfo.formName);
        setFormGroup(gotFormInfo.formGroupId === null ? 0: gotFormInfo.formGroupId);
        setSelectedTables(gotFormInfo.formTables === null ? [] : gotFormInfo.formTables);
    }, [gotFormInfo]);

    useEffect(() =>{
        if(includedForm !== -1){
            setFormId(includedForm);
            getFormList();
        }
    }, [includedForm]);

    useEffect(() =>{
        getFormList();
    }, [updatedFormName]);

    useEffect(()=>{
        if(formId && formId > 0){
            retrieveJsonForm(formId);
        }
    }, [includedFormItem, updatedFormItemParent, removedFormItem]);


    useEffect(()=>{
        setJsonForm(retrievedJsonForm);
    }, [retrievedJsonForm]);

    useEffect(() =>{
        if(gotTableList)
            setTableList(gotTableList);
    }, [gotTableList]);

    useEffect(() => {
        setFormGroupList(gotFormGroupList);
    }, [gotFormGroupList]);

    useEffect(() =>{
        
        let items = document.querySelectorAll(".editing");

        items.forEach(item =>{
            if(showGrid){
                item.classList.remove("false");
                item.classList.add("black");
            }else{
                item.classList.remove("black");
                item.classList.add("false");
            }
        });

    }, [showGrid]);

    const openPropertieDrawer = (formItemId) =>{
        setFormItemId(formItemId);
        setShowPropertiesDrawer(true);
    }

    const allowDropRemove = (ev) =>{
        ev.stopPropagation();
        ev.preventDefault();
    };

    const removeBackGround = (ev) =>{
        ev.stopPropagation();
        ev.preventDefault();
        ev.target.classList.remove("draggingOver");
    }

    const hideRemove = () =>{
        setVisible(false);
    }

    const dragToRemove = (ev) =>{
        ev.stopPropagation();
        setVisible(true);
        ev.dataTransfer.setData("componentid", ev.target.dataset.componentid);
        ev.dataTransfer.setData("formitemid", ev.target.dataset.formitemid);
    }

    const dropRemove = (ev) =>{
        ev.stopPropagation();
        ev.preventDefault();
        
        let id = ev.dataTransfer.getData("formitemid"); 

        removeFormItem(id);

        setVisible(false);
    }

    const allowDrop = (ev) =>{
        ev.stopPropagation();
        ev.preventDefault();
        ev.target.classList.add("draggingOver");
    };

    const drag = (ev) =>{
        ev.stopPropagation();
        ev.persist();
        ev.dataTransfer.setData("componentid", ev.target.dataset.componentid);
    };

    const drop = (ev) =>{     
        ev.stopPropagation();  
        ev.preventDefault();
        hideRemove();

        ev.target.classList.remove("draggingOver");

        let componentId = parseInt(ev.dataTransfer.getData("componentid"));
        let editformitemid = parseInt(ev.dataTransfer.getData("formitemid").trim());

        if(!isNaN(editformitemid) && !isNaN(parseInt(ev.target.id))){
            if(parseInt(ev.target.id) !== parseInt(editformitemid)){
                updateFormItemParent(ev.target.id, editformitemid);
            }
        }else
        {
            includeFormItem(formId, componentId, ev.target.id);
        }
    }

    const includeOrUpdateForm = () =>{
        if(formId > 0 && formId !== undefined)
            updateFormName(formId, formName);
        else if(formName !== "" && formName !== undefined)
            includeForm(formName);
    }

    const includeOrRemoveFormTable = () =>{
        includeFormTable(formId, selectedTables);
    }

    const associateCurrentFormToGroup = () =>{
        associateFormToGroup(formId, formGroup);
    }

    return(
            <Container fluid={true}>
                <br/>
                <Row>
                    <Col md="4">
                        <Form.Group>
                            <Form.Label>Give this form a name</Form.Label>
                            <Form.Control type="text" onChange={(e) => setFormName(e.target.value)} onBlur={() => includeOrUpdateForm()} value={formName}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md="3">
                        <Form.Group>
                            <Form.Label>Select the tables to own it</Form.Label>
                            <ReactMultiSelectCheckboxes disabled={formId === 0 ? true : false} options={tableList} onChange={(e) => setSelectedTables(e)} onBlur={() => includeOrRemoveFormTable()} value={selectedTables}/>
                        </Form.Group>
                    </Col>
                    <Col md="3">
                        <Form.Label>Attached to a group</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control as="select" disabled={formId === 0 ? true : false} onChange={(e) => setFormGroup(e.target.value)} onBlur={() => associateCurrentFormToGroup()} value={formGroup}>
                                <option value={-1}>Select one option</option>
                                {
                                    formGroupList.map(formGroup =>
                                        <option key={formGroup.formGroupId} value={formGroup.formGroupId}>{formGroup.formGroupName}</option>
                                    )
                                }
                            </Form.Control>
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={() => setShowNewGroup(true)}>New Group</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md={2}>
                            <ListGroup>
                                {
                                    formComponents.map((component) =>
                                        <ListGroup.Item className="component-item" key={component.formComponentId} data-componentid={component.formComponentId} draggable={formId !== 0 ? true : false} onDragStart={(ev) => drag(ev)}><FontAwesomeIcon icon={component.componentIcon} /> {component.componentName}</ListGroup.Item>
                                    )
                                }
                            </ListGroup>
                            <br/>
                            <div className={`remove-area ${!visible ? 'hideIt' : ''}`} onDrop={(ev) => dropRemove(ev)} onDragOver={(ev) => allowDropRemove(ev)}>
                                <div className="remove-icon">
                                    <FontAwesomeIcon icon="trash-alt" size="2x"/>
                                </div>
                            </div>
                        <br/>
                        <Button variant="outline-secondary" onClick={() => setShowGrid(!showGrid)}>{showGrid ? "Hide" : "Show"} grid</Button>
                    </Col>
                    <Col md={10} onDrop={(ev) => drop(ev)} onDragOver={(ev) => allowDrop(ev)} onDragLeave={(ev) => removeBackGround(ev)}>
                        <JsonForm form={jsonForm} developMode={true} drop={drop} allowDrop={allowDrop} removeBackGround={removeBackGround} openProperties={openPropertieDrawer} dragStart={dragToRemove}/>
                    </Col>
                </Row>
                <div className="drawerToggleButton right" onClick={() => setShowPropertiesDrawer(!showPropertiesDrawer)}>
                    <div className="icon">
                        <FontAwesomeIcon icon="edit" size="xs"/>
                    </div>
                </div>
                <div className={`drawer secondary right ${showPropertiesDrawer ? "openDrawer" : "closeDrawer"}`}>
                    <div className="closebtn left" onClick={() => setShowPropertiesDrawer(!showPropertiesDrawer)}>&times;</div>
                    <div className="row">
                        <div className="col">
                            <FormItemProperty formItemId={formItemId} formId={formId}/>
                        </div>
                    </div>
                </div>
                <CustomModal show={showNewGroup} dialogClassName="customMedium" title="Include new group" onClick={() => setShowNewGroup(!showNewGroup)}>
                    <FormRetriever formId={77}/>
                </CustomModal>
            </Container>
    );
}

const mapStateToProps = state =>{
    return{
        gotFormComponents: state.forms.formComponents,
        gotFormInfo: state.forms.formInfo,
        includedForm: state.forms.includedForm,
        updatedFormName: state.forms.updatedFormName,
        includedFormItem: state.forms.includedFormItem,
        removedFormItem: state.forms.removedFormItem,
        retrievedJsonForm: state.forms.retrievedJsonForm,
        updatedFormItemParent: state.forms.updatedFormItemParent,
        gotTableList: state.forms.gotTableList,
        gotFormGroupList: state.forms.gotFormGroupList,
        includedFormTable: state.forms.includedFormTable,
        associatedFormToGroup: state.forms.associatedFormToGroup
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        getFormComponents: () =>{
            dispatch(FormActions.formComponentRequest());
        },
        getFormInfo: (formId) =>{
            dispatch(FormActions.formInfoRequest(formId));
        },
        includeForm: (formName) =>{
            dispatch(FormActions.includeFormRequest(formName));
        },
        updateFormName: (formId, formName) =>{
            dispatch(FormActions.updateFormNameRequest(formId, formName));
        },
        includeFormItem: (formId, componentId, formItemParentId) =>{
            dispatch(FormActions.includeFormItemRequest(formId, componentId, formItemParentId));
        },
        updateFormItemParent: (formItemParentId, formItemId) =>{
            dispatch(FormActions.updateFormItemParentRequest(formItemParentId, formItemId));
        },
        removeFormItem: (formItemId) => {
            dispatch(FormActions.removeFormItemRequest(formItemId));
        },
        retrieveJsonForm: (formId) =>{
            dispatch(FormActions.retrieveJsonFormRequest(formId));
        },
        getFormList: () =>{
            dispatch(FormActions.formListRequest());
        },
        getTableList: () =>{
            dispatch(FormActions.tableListRequest());
        },
        getFormGroupList: () =>{
            dispatch(FormActions.formGroupListRequest());
        },
        includeFormTable: (formId, associatedTables) =>{
            dispatch(FormActions.includeFormTableRequest(formId, associatedTables));
        },
        associateFormToGroup: (formId, formGroupId) =>{
            dispatch(FormActions.associateFormToGroupRequest(formId, formGroupId));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FormRegister);