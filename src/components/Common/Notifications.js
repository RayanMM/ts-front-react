import React, {Component} from 'react';

export default class Notifications extends Component{
    render(){
        return(
            <li className="dropdown notifications-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-bell-o"></i>
              <span className="label label-warning">{this.props.notifications.length}</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">{this.props.notifications.length === 0 ? "Você não possui notificações" : this.props.notifications.length === 1 ? "Você possui 1 notificação" : `Você possui ${this.props.notifications.length} notificações`}</li>
              <li>
                <ul className="menu">
                    {
                        this.props.notifications.map(notif =>
                            <li key={notif.id}>
                                <a href="#">
                                <i className={`fa ${notif.icon} ${notif.icon_color}`}></i> {notif.message}
                                </a>
                            </li>
                        )
                    }
                </ul>
              </li>
              <li className="footer"><a href="#">Ver Todas</a></li>
            </ul>
          </li>
        );
    }
}