import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import * as FormActions from '../../store/Form/actions';
import { Container,Row, Col, Button} from 'react-bootstrap';
import DataTable from '../Common/DataHandle/DataTable';
import CustomModal from '../Common/CustomModal';
import FormRegister from './FormRegister';

const FormList = ({getFormList, gotFormList}) =>{
    const [formList, setFormList] = useState([]);
    const [newForm, setNewForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [formParameters, setFormParameters] = useState([]);

    useEffect(()=>{
        getFormList();
    }, []);

    useEffect(() =>{
        setFormList(gotFormList);
    }, [gotFormList]);

    useEffect(()=>{
        if(formParameters.length !== 0)
            setEditForm(true);
    }, [formParameters]);

    const config =
    {
        itemsPerPage: 10,
        tableId: 'formsTable',
        rowClick: false,
        rowColor: false,
        //rowColorTarget: "cor",
        idReference: "formId",
        fixedFirstColumn: true
    };

    const headers = [
            {
                Column: 'Form Edition',
                Target: 'formId',
                Type: "button",
                columnClick: true,
                ParameterTarget: 'formId; formName',
                btnColor: "warning",
                btnFixedText: "Edit",
                clickAction: (parameter) => formEdition(parameter)
            },
            {
                Column: 'Name',
                Target: 'formName'
            },
            {
                Column: 'Active',
                Target: 'formActive'
            }
        ]

    const formEdition = (parameter) =>{
        setFormParameters(parameter);
    }

    return(
        <Container fluid={true}>
            <Row>
                <Button variant="outline-info" onClick={() => setNewForm(true)}>Include new form</Button>
            </Row>
            <br/>
            <Row>
                <Col md="12">
                    <DataTable config={config} headers={headers} data={formList}></DataTable>
                </Col>
            </Row>
            <CustomModal show={newForm} dialogClassName="customExtraLarge" title="Include new form" onClick={() => setNewForm(!newForm)}>
                <FormRegister formId={0} formName=""/>
            </CustomModal>
            <CustomModal show={editForm} dialogClassName="customExtraLarge" title="Edit form" onClick={() => setEditForm(!editForm)}>
                <FormRegister formId={formParameters[0]} formName={formParameters[1]}/>
            </CustomModal>
        </Container>
    )
}

const mapStateToProps = state =>{
    return{
        gotFormList: state.forms.formList
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getFormList: () =>{
            dispatch(FormActions.formListRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormList);