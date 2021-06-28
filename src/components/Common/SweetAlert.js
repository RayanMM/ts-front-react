import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import {store} from '../../store/store';
import * as AlertActions from '../../store/Alert/actions';
import {sleep} from '../../common/Utils';

export function Alert(object){
    //Dispatching alert
    store.dispatch(AlertActions.fire_alert(object.type, object.title, object.text, object.time));

    //Setting time to wait. If it is undefined or null set 2 seconds
    let wait = object.time ? object.time : 2000;

    //After waiting clear up the message
    sleep(wait).then(() => {
        store.dispatch(AlertActions.clear_alert()); 
    });
}

const SweetAlert = ({alert}) =>{
    useEffect(() => {
        if(alert.show)
        {
            let timerInterval;
            let icon = "warning";

            switch (alert.type) {
                case 1:
                        icon = "success";
                    break;
                case 2:
                        icon = "warning";
                    break;
                case 3:
                        icon = "error";
                    break;
                case 4:
                        icon = "info";
                    break;
                default:
                        icon = "warning";
                    break;
            }


            Swal.fire({
                icon: icon,
                title: alert.title,
                text: alert.text,
                timer: alert.time ? alert.time : 2000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        const content = Swal.getContent()
                        if (content) {
                            const b = content.querySelector('b')
                            if (b) {
                                b.textContent = Swal.getTimerLeft()
                            }
                        }
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                }
            })
        }
    }, [alert]);

    return <></>
}

const mapStateToProps = state =>{
    return{
        alert: state.alert
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        fire_alert: (type, title, message) =>{
            dispatch(AlertActions.fire_alert(type, title, message))
        },
        clear_alert: () =>{
            dispatch(AlertActions.clear_alert());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SweetAlert);