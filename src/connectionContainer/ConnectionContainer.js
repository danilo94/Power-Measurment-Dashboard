import React from 'react'
import './ConnectionContainer.css'
import ToggleButton from '../Basics/ToggleButton/ToggleButton'
import If from '../Basics/Condicional/If'
import Input from '../Basics/Input/Input'
import Select from '../Basics/Select/Select'
const remote = window.require("electron").remote;
const serial = remote.require('serialport');
export default class ConnectionContainer extends React.Component {


    state={
        connectionCable: false,
        serial: '',
        baudRate: 0,
        ip:'',
        ipPort:0,
        serialPorts:[]
    };

    constructor(props){
        super(props);
        
    }


    listAvailablePorts = () =>{
        serial.list().then(
            ports => {
             if (ports.length === 0){
                 return this.setState({serialPorts:[]})
             }
             else{
                var availablePorts =[]
                ports.forEach(port => {
                    availablePorts.push(port.comName);
                   })
                   this.setState({serialPorts:availablePorts});
             }
            },
            err => {
             console.error('Error listing ports', err)
            })
    }


    setConnectionCable = (status) =>{
        this.setState({connectionCable: status});
        if (status){
            this.listAvailablePorts();
        }
    }


    getIp = (ip) =>{
        this.setState({ip: ip});
    }

    getPort = (port) =>{
        this.setState({port: port});
    }

    getSerial = (serial) =>{
        this.setState({serial: serial});
    }

    getBaudRate = (baudRate) =>{
        this.setState({baudRate: baudRate});
    }

    handleConnectButton = () =>{
        this.props.connect(this.state.connectionCable,this.state.serial,this.state.baudRate,this.state.ip,this.state.port);
    }

    handleDisconnectButton = ()=>{
        this.props.disconnect();
    }

    render(){
        return(
        <div className="ConnectionContainer">
            <ToggleButton connectionCable={this.setConnectionCable}></ToggleButton>
                <If test={this.state.connectionCable} >
                    <div className="ContainersInternos">
                        <h4>Serial Port: </h4>
                        <Select options={this.state.serialPorts} getOption= {this.getSerial}></Select>
                    </div>
                    <div className="ContainersInternos">
                        <h4>Baudrate: </h4>
                        <Input getValue= {this.getBaudRate}></Input>
                    </div>
                </If>
                <If test={!this.state.connectionCable}>
                <div className="ContainersInternos">
                    <h4>Ip:</h4>
                    <Input getValue={this.getIp}></Input>
                </div>
                <div className="ContainersInternos">
                    <h4>Port:</h4>
                    <Input getValue={this.getPort}></Input>
                </div>
                </If>
                <div className="ContainersInternos">
                    <button className="connectButton" onClick={this.handleConnectButton}>Connect</button>
                </div>
                <div className="ContainersInternos">
                    <button className="disconnectButton" onClick={this.handleDisconnectButton}>Disconnect</button>
                </div> 
        </div>
                );
    }
}
