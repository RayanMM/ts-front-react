import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as MenuActions from '../../store/Menu/actions';
import CustomModal from '../../components/Common/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommonApi from '../../common/CommonApi';
import SubMenu from '../Navigation/SubMenu';
import FormRetriever from '../Form/FormRetriever';

class Sidebar extends Component{
    constructor(){
        super();
        this.state = ({
          userName: "", 
          configMenus:[], 
          subMenu: [], 
          drawerState: "closeDrawer",
          formRetriever: false,
          menuId: 0
        });
    }

    componentDidMount(){
      this.props.getUserSideMenu(4);
    }

    componentDidUpdate(){
        if(!CommonApi.CompareArrays(this.props.userSideMenu, this.state.configMenus))
            this.setState({configMenus:this.props.userSideMenu, userName: this.props.name});
    }

    handleClose(property) {
      var field = {};
      field[property] = false;
      this.setState(field);
    }

    handleShow(property) {
        var field = {};
        field[property] = true;
        this.setState(field);
    }

    openSubMenu(menuId){
        this.setState({menuId: menuId, drawerState: "openDrawer"});
    }

    closedComponent(){
        this.setState({menuId: 0, drawerState: "closeDrawer"});
    }

    render(){
        const types = {
            formRetriever: FormRetriever
        }

        return(
            <nav className={this.props.colapsed ? "sidebar active" : "sidebar"}>
            <div className="sidebar-header">
                <div className="complete_logo">Total safe</div>
                <div className="logo">TS</div>
            </div>

            <ul className="list-unstyled components">
                {
                    this.state.configMenus.map(menu =>
                        <li key={menu.menusId}>
                            <a onClick={this.openSubMenu.bind(this, menu.menusId)} className={this.state.menuId === menu.menusId ? "active" : ""}>
                                <i><FontAwesomeIcon icon={menu.menuIcon} /></i>
                                {menu.menusDescription} 
                                {/* <FontAwesomeIcon icon="angle-right" className="dl"/> */}
                            </a>
                        </li>
                    )
                }
            </ul>
            <SubMenu menuId={this.state.menuId} drawerState={this.state.drawerState} callBack={() => this.closedComponent()}></SubMenu>
                {
                    this.state.configMenus.map(menu =>{

                        const $component = types[menu.modal];

                        if(menu.modal !== null){
                            return(
                                <CustomModal key={menu.menusId} show={this.state[menu.modal]} dialogClassName={menu.modalSize} title={menu.menusDescription} onClick={() => this.handleClose(menu.modal)}>
                                    <$component itemId={menu.menusId} menu={true}/>
                                </CustomModal>
                            );
                        }
                        
                    }
                    )
                }
        </nav>
        );
    }
}

const mapStateToProps  = state => {   
    return {
        userSideMenu: state.menus.menus, 
    }
  }
  
  const mapDispatchToProps = dispatch =>{
    return {
        getUserSideMenu: (menuGroup) =>{
            dispatch(MenuActions.menuRequest(menuGroup));
        }
    }
  }
    
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);