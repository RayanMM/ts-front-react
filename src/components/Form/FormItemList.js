import React, {useState, useRef} from 'react';
import DataDrivenDataTable from '../Common/DataTable/DataDrivenDataTable';
import {Container, Button, Row, Col} from 'react-bootstrap';
import CustomModal from '../Common/CustomModal';
import FormRetriever from './FormRetriever';

const FormItemList = props =>{
    const [show, setShow] = useState(false);
    const [itemId, setItemId] = useState(0);
    const [menuName, setMenuName] = useState("");
    const [isMenu, setIsMenu] = useState(false);
    const [dataHasChanged, setDataHasChanged] = useState({changed: false, key: 0});
    const [modalSize, setModalSize] = useState("customMedium");

    useState(() =>{
        setItemId(props.itemId);
        setMenuName(props.menuName);
        setIsMenu(props.menu);
    }, [props]);

    const callBack = () =>{
        setDataHasChanged({changed: true, key: new Date().getMilliseconds()});
    }

    return (
        <Container fluid={true}>
            <Row>
                <Col md="12">
                    <Button variant="info" onClick={()=> setShow(!show)}>New</Button>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <DataDrivenDataTable itemId={itemId} menu={isMenu} title={menuName} updatedData={dataHasChanged} setModalSize={setModalSize}/>
                </Col>
            </Row>
            <CustomModal show={show} dialogClassName={modalSize} title={menuName} onClick={() => setShow(!show)}>
                <FormRetriever itemId={itemId} menu={isMenu} callBack={() => callBack()} identifier={0}/>
            </CustomModal>
        </Container>        
    )
}

export default FormItemList;
