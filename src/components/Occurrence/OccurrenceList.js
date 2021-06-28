import React, {useState, useRef} from 'react';
import DataDrivenDataTable from '../Common/DataTable/DataDrivenDataTable';
import {Container, Button, Row, Col} from 'react-bootstrap';
import CustomModal from '../Common/CustomModal';
import Occurrence from './Occurrence';

const OccurrenceList = props =>{
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
                    <DataDrivenDataTable itemId={itemId} menu={isMenu} title={menuName} updatedData={dataHasChanged} setModalSize={setModalSize} useComponent={true} component="occurrence"/>
                </Col>
            </Row>
            <CustomModal show={show} dialogClassName={modalSize} title={menuName} onClick={() => setShow(!show)}>
                <Occurrence callBack={() => callBack()}/>
            </CustomModal>
        </Container>        
    )
}

export default OccurrenceList;
