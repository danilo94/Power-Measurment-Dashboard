import React from 'react'


export default class Input extends React.Component {

    state={
        value:0
    }


    valueModifier = (event) =>{
        this.setState({value: event.target.value})
        this.props.getValue(event.target.value);
    }

    constructor(props){
        super(props);
    }

    render(){
        return(
        <div>
            <input value={this.state.value} onChange={this.valueModifier}>
            </input>
        </div>)
    }

}