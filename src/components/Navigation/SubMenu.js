import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';
import CustomModal from '../../components/Common/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as MenuActions from '../../store/Menu/actions';
import CommonApi from '../../common/CommonApi';
import FormList from '../Form/FormList';
import FormItemList from '../Form/FormItemList';
import OccurrenceList from '../Occurrence/OccurrenceList';

class SubMenu extends Component{
    constructor(){
        super();
        this.state = ({
            isOpened: "closeDrawer", 
            subMenus: [],
            menuId: 0,
            showModal: {

            }
        });
    }

    componentDidUpdate(){
        if(this.props.menuId !== this.state.menuId && this.props.menuId !==undefined){
            this.setState({menuId: this.props.menuId});
            this.props.getSubMenus(this.props.menuId);
        }

        if(this.props.drawerState !== this.state.isOpened){
            this.setState({isOpened: this.props.drawerState});
        }

        if(!CommonApi.CompareArrays(this.props.subMenus, this.state.subMenus)){
            this.setState({subMenus: this.props.subMenus}, () =>{
                let showThisModal = {...this.state.showModal};

                this.state.subMenus.forEach(subMenu =>{
                    showThisModal[`${subMenu.modal}_${subMenu.subMenusId}`] = false;

                    this.setState({showModal: showThisModal});

                })
            });
        }
    }

    drawerMovement(){
        this.props.callBack();
    }

    handleClose(property, item_id) {
        let modal_property = `${property}_${item_id}`;

        var field = {};
        field[modal_property] = false;
        this.setState({showModal: field});
    }

    handleShow(property, item_id) {
        let modal_property = `${property}_${item_id}`;
        var field = {};
        field[modal_property] = true;

        this.setState({showModal: field});
    }   

    render(){
        const types = {
            formList: FormList,
            formItemList: FormItemList,
            occurrenceList: OccurrenceList
        };

        return(
            <div className={`drawer left ${this.state.isOpened}`}>
                <div className="closebtn right" onClick={this.drawerMovement.bind(this)}>&times;</div>
                <Container fluid={true}>
                    {
                        this.state.subMenus.map(subMenu =>{
                            let icon = subMenu.menuIcon.toString().split(' ');

                            return(<Row key={subMenu.subMenusId}>
                                <Col >
                                    <div className="item" onClick={() => this.handleShow(subMenu.modal, subMenu.subMenusId)}>
                                        <i><FontAwesomeIcon icon={[`${icon[0]}`, `${icon[1]}`]} /></i>
                                        {subMenu.subMenusDescription}     
                                    </div> 
                                </Col>
                            </Row>)
                        }
                        )
                    }
                </Container>
                {
                    this.state.subMenus.map(subMenu =>{

                        const $component = types[subMenu.modal];

                        return(
                            <CustomModal key={subMenu.subMenusId} show={this.state.showModal[`${subMenu.modal}_${subMenu.subMenusId}`]} dialogClassName={subMenu.subMenusSize} title={subMenu.subMenusDescription} onClick={() => this.handleClose(subMenu.modal, subMenu.subMenusId)}>
                                <$component itemId={subMenu.subMenusId} menu={false} menuName={subMenu.subMenusDescription}/>
                            </CustomModal>
                        );
                    }
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        subMenus: state.menus.subMenus
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        getSubMenus: (menuId) =>{
            dispatch(MenuActions.submenuRequest(menuId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);