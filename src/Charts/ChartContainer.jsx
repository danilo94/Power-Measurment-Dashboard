import React from 'react'
import './ChartContainer.css'
import Chart from './Chart';


export default class ChartContainer extends React.Component {

i=0
state = {
    value: 0,
}
constructor(props){
    super(props);
}


render (){
    return(
    <div className="ChartContainer">
        <Chart  start ={this.props.start} value={(Math.round(this.props.voltage * 100) / 100).toFixed(2)} lineColor = "rgba(34, 109, 54, 0.5)" chartName="Voltage (V)"></Chart>
        <Chart start ={this.props.start} value={(Math.round(this.props.current * 100) / 100).toFixed(2)} lineColor = "rgba(206, 92, 54, 0.5)" chartName="Current (mA)"></Chart>
        <Chart start ={this.props.start} value={(Math.round(this.props.power * 100) / 100).toFixed(2)} lineColor = "rgba(239, 200, 138, 0.5)" chartName="Power (mW)"></Chart>
    </div>);
}


}