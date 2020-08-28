import React from 'react'
import './CardContainer.css'
import InstantConsumption from '../components/Card/InstantConsumption';

export default class CardContainer extends React.Component {

    constructor(props){
        super(props);

    }

    render(){
        return (
        <div className="Container">
            <InstantConsumption Name="Voltage (V)" Value={this.props.voltage} Magnitude ="V"></InstantConsumption>
            <InstantConsumption Name="Shunt Voltage (V)" Value={this.props.shuntVoltage} Magnitude="mV"></InstantConsumption>
            <InstantConsumption Color="#CF5C36" Name="Current (A)" Value={this.props.current} Magnitude="mA"></InstantConsumption>
            <InstantConsumption Color="#EFC88B" Name="Power (W)" Value={this.props.power} Magnitude="mW"></InstantConsumption>
        </div> );
    }

}