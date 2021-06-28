import React, {Component} from 'react';
import '../../assets/css/form.css';
import Button from './Button';
import Swal from 'sweetalert2';
import { Alert } from './SweetAlert';

export default class StepFormTab extends Component{
    constructor(props){
        super(props);
        this.state = ({totalTabs:this.props.children.length ,currentTab: 0});
    }

    getChildren(){
        return React.Children.map(this.props.children, (child,i) => {
            if(i === this.state.currentTab)
            {
                return React.cloneElement(child, {
                    className: "ts-tab active"
                })
            }else
                return child;
        })
    }

    handlePrevNext(tab, event)
    {
        if(tab < 0)
            this.setState({currentTab: this.state.currentTab - 1});
        else{
            if(this.validateForm(this.props.children[this.state.currentTab].props.children))    
                this.setState({currentTab: this.state.currentTab + 1});
            else
                Alert({
                    title: "Ops!",
                    text: "Do not forget filling out all the fields!",
                    type: 2
                });
        }
    }

    validateForm(children){
        let toReturn = true;

        children = React.Children.toArray(children);
       
        for(let child in children){
           if(children[child].props)
            if(children[child].props.children){
                toReturn = !toReturn ? false : this.validateForm(children[child].props.children);
            }else{
                if(children[child].props.required === true && (children[child].props.value === null || children[child].props.value === undefined || children[child].props.value === ""))
                    toReturn = false;
                else
                    toReturn = !toReturn ? false : true;
            }
        }

        return toReturn;
    }

    render(){
        return(
            <form onSubmit={this.props.onSubmit} id="userRegisterForm">
                {this.getChildren()}
                <div className="row text-right">
                    <div className="col-md-12">
                        <Button type='button' value ='Previous' className="btn btn-ts-secondary btn-lg" click={this.handlePrevNext.bind(this,-1)} disabled={this.state.currentTab === 0 ? true : false}></Button>
                        &nbsp;
                        <Button type="button" value ='Next' className={`btn btn-ts-primary btn-lg ${this.state.currentTab + 1 === this.state.totalTabs ? "hideIt" : ""}`} click={this.handlePrevNext.bind(this,1)}></Button>
                        <Button type="submit" value ='Save' className={`btn btn-ts-primary btn-lg ${this.state.currentTab + 1 !== this.state.totalTabs ? "hideIt" : ""}`}></Button>
                    </div>
                </div>
            </form>
        );
    }
}