import React, { Component } from 'react';
import './App.css';
import CardContainer from './cardContainer/CardContainer.js';
import ConnectionContainer from './connectionContainer/ConnectionContainer.js';
import ChartContainer from './Charts/ChartContainer';
const remote = window.require("electron").remote;
const SerialPort = remote.require('serialport');
const Readline = remote.require('@serialport/parser-readline')
class App extends Component {
  serial;


  constructor(props){
    super(props);
  }
  state ={
    current:0,
    shuntVoltage:0,
    voltage:0,
    power:0,
    start:false

  };

  parseSerialData = (rawData) =>{
    var consumptionDetails = JSON.parse(rawData);
    this.setState({current: consumptionDetails.C});
    this.setState({shuntVoltage: consumptionDetails.SV});
    this.setState({voltage: consumptionDetails.V});
    this.setState({power: consumptionDetails.P});
  }
  
  connect = (switchStatus,serialPort,baudRate,ip,port) =>{
    this.setState({start:true})
    if (switchStatus){
      this.serial = new SerialPort(serialPort, { baudRate: parseInt(baudRate) })
      const parser = new Readline()
      this.serial.pipe(parser)
      parser.on('data', line => this.parseSerialData(line))
    }
    else{
      console.log("IP: ",ip);
      console.log("Port: ",port);

    }
  }

  disconnect = ()=>{
    this.setState({start:false})
    if (this.serial){
      this.serial.close(function (err) {
        console.log('port closed', err);
      });  
    }

  }

  render() {
    return (
      <div className="App">
          <ConnectionContainer connect={this.connect} disconnect={this.disconnect}></ConnectionContainer>
          <CardContainer  voltage={this.state.voltage} current={this.state.current} shuntVoltage={this.state.shuntVoltage} power={this.state.power}></CardContainer>
          <ChartContainer start={this.state.start} voltage={this.state.voltage} current={this.state.current} power={this.state.power} ></ChartContainer>
      </div>
    );
  }
}

export default App;
