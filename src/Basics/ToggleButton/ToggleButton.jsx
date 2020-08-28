import React from 'react'
import {Switch } from '@material-ui/core';
import './ToggleButton'


export default class ToggleButton extends React.Component {


    constructor(props){
        super(props)
        this.state ={
            checked: false
            
        };
      
    }
    
    handleStatus = () =>{
        this.setState({ checked: !this.state.checked });
        this.props.connectionCable(!this.state.checked);
    }

    render(){
        return(
        <div style={{display:"flex"}}>
            <div style={{margin:'10px'}}>
                <i className="fa fa-wifi fa-lg" aria-hidden="true" style={{color: this.state.checked ? '#adaeb0': '#226e36'}}/>
            </div>
            <div >
            <Switch color="primary" checked={this.state.checked} onChange={this.handleStatus}></Switch>
            </div>
            <div style={{margin:'10px'}}>
                <i className="fa fa-plug fa-lg" aria-hidden="true" style={{color: !this.state.checked ? '#adaeb0': '#226e36'}}/>
            </div>
        </div>);
    }
}