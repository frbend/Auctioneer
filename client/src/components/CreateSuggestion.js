import React, {Component} from 'react';
import {navigate} from "@reach/router";

class CreateSuggestion extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "",
        }
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(){
        this.props.submit(this.state.title);
        console.log(this.state.title);
        navigate("/");
    }


    render() {
        return(
            <>
                <p>Suggestion:</p>
                <input name="title" type="text" onChange={event => this.onChange(event)}/>
                <button onClick={_ => this.onSubmit()}>Post suggestion</button>
            </>
        )

    }
}

export default CreateSuggestion;