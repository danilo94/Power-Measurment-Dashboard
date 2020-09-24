import React, { Component } from 'react';
import './App.css';
import CardContainer from './cardContainer/CardContainer.js';
import ConnectionContainer from './connectionContainer/ConnectionContainer.js';
import ChartContainer from './Charts/ChartContainer';
const remote = window.require("electron").remote;
const SerialPort = remote.require('serialport');
const Readline = remote.require('@serialport/parser-readline')
const WebSocketClient = remote.require('websocket').client
class App extends Component {
  serial;
  webSocket;
  connection;
  state ={
    current:0,
    shuntVoltage:0,
    voltage:0,
    power:0,
    start:false

  };

  parseJsonData = (rawData) =>{
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
      parser.on('data', line => this.parseJsonData(line))
    }
    else{

      this.webSocket = new WebSocket('ws://'+ip+':'+port+'/');
      this.webSocket.onopen = function(e) {
        console.log("[open] Connection established");

        
      };
      
      this.webSocket.onmessage = (event) =>{
        this.parseJsonData(event.data);
      };
      
      this.webSocket.onclose = function(event) {
        if (event.wasClean) {
          console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          console.log('[close] Connection died');
        }
      };
      
      this.webSocket.onerror = function(error) {
        console.log(`[error] ${error.message}`);
      };
    }
  }


  connectedWebSocket = (connection) =>{
    console.log('WebSocket Client Connected');

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });

    connection.on('message', function(message) {
      console.log(message);
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
  })
  };


  disconnect = ()=>{
    this.setState({start:false})
    if (this.serial){
      this.serial.close(function (err) {
        console.log('port closed', err);
      });  
    }
    if (this.webSocket){
      this.webSocket.close()
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
