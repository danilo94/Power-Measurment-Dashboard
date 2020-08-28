import React from 'react'


export default class Select extends React.Component {
    state={
        value:''
    }
    constructor(props){
        super(props);

        this.createOptions();
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
        this.props.getOption(event.target.value)
    }
    
    createOptions = () => {
        let options =[];
        if (this.props.options.length === 0){
            options.push(<option key={0}>None</option>);

        }
        else{
            options.push(<option key='-'>-</option>);
            for (let i=0; i< this.props.options.length; i++){
                options.push(<option key={i}>{this.props.options[i]}</option>);
            }
        
        }
        return options;
    }

    render(){


        return(
        <div>
            <select value={this.state.value} onChange={this.handleChange}>
                {this.createOptions()}
            </select>
        </div>)
    }

}