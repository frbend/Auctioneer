import React, {Component} from "react";
import AuthService from "./AuthService";


class AddBid extends Component{
    constructor(props) {
        super(props);
        this.state = {
            signature: "",
            timeNow: new Date().toLocaleString(),
            user: localStorage.username
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
    }


    handleChange(event) {
            this.setState({
                signature: event.target.value})
    }


    handleSubmit(event) {
        if(this.Auth.loggedIn()){
            this.props.submit(("Bid made by: ") + this.state.user + (", ") + this.state.signature + ("kr") + (" ") + ("at ") + this.state.timeNow);
        }
        if(this.Auth.loggedIn()===false){
            return alert("You must be logged in!")
        }
        if(this.state.input >= this.props.renderBids.li){
            return alert ("Amount must be higher")
        }
    } 


    render() {
            return(
            <>
                <h3>Add a bid here: </h3>
                <input name="newBid" onChange={event => this.handleChange(event)} type="number" />
                <button onClick={_ => this.handleSubmit()}>Bid!</button>
            </>
        )
    }
}

export default AddBid;