import React from 'react'
import './InstantConsumption.css'


export default class InstantConsumption extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="Card">
            <div>
                <h3>{this.props.Name}</h3>
            </div>
            <div>
        <h1 style={{color:this.props.Color}}>{(Math.round(this.props.Value * 100) / 100).toFixed(2)}  {this.props.Value ? this.props.Magnitude : ''}</h1>
            </div>
        </div> );
    }
}