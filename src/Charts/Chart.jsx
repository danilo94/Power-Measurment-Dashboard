import React from 'react'
import './Chart.css'
import {Line} from 'react-chartjs-2';

export default class Chart extends React.Component {
i=0;
oldValue = 0
state ={
  value:[],
  timestamp:[],
  start: false
}

options ={
  legend:{
    display:false
  }
}

updateGraph = () =>{
  this.setState.start = this.props.start;
  if (this.props.value && this.setState.start){
    this.oldValue = this.props.value;

    this.setState({value: this.state.value.concat(this.props.value < 0 ? 0 : this.props.value)});
    this.setState({timestamp: this.state.timestamp.concat(this.i++)});
    this.data = {
      labels: this.state.timestamp,
      datasets: [
        {
          fill: true,
          lineTension: 0.1,
          backgroundColor: this.props.lineColor,
          borderColor: this.props.lineColor,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.value
        }
      ]
    };
  }
}

constructor(props){
    super(props);


}

render (){
    return(
    <div className="Chart">
        <div>
           <h3>{this.props.chartName}</h3>
            <Line data={this.data} options={this.options} height={225}></Line>     
        </div>
    </div>);
}


componentDidMount(){
  setInterval(this.updateGraph,100)
}

}