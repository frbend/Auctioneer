import React, {Component} from "react";
import AuthService from "./AuthService";


class AddSignature extends Component{
    constructor(props) {
        super(props);
        this.state = {
            signature: "",
            submit: "",
            timeNow: new Date().toLocaleString()
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
    }


    handleChange(event) {
        this.setState({
            signature: event.target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault()
        if(this.Auth.loggedIn() && this.state.signature === localStorage.username){
            this.setState({
                submit: this.state.signature + (" ") + this.state.timeNow 
            });
        }
        if(this.Auth.loggedIn()===false){
            return alert("You must be logged in!")
        }
        if(this.state.signature !== localStorage.username){
            return alert ("You must use your username to create a signature!")
        }
    }

    render() {
        return(
            <>
                <h3>Signature: </h3>
                <form onSubmit={this.handleSubmit}>
                <input value={this.state.signature} onChange={this.handleChange} />
                <button className="submit" type="submit">Submit</button>
                </form>
                <h3>{this.state.submit}</h3>
            </>
        )
    }
}

export default AddSignature;