import React, {Component} from 'react';
import {Link} from "@reach/router";
import {Router} from "@reach/router";
import { navigate} from "@reach/router";
import AllAuctions from './components/AllAuctions';
import OneAuction from './components/OneAuction';
import Login from './components/Login';
import Nav from './components/Nav';
import AuthService from './components/AuthService';
import ErrorBoundary from './components/ErrorBoundary';


class App extends Component{


    API_URL = process.env.REACT_APP_API_URL;

    constructor(props){
    super(props);

    // Initialize the auth service with the path of the API authentication route.
    this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
    this.state = {
      suggestions: []
    };
        this.getSuggestion = this.getSuggestion.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
  }

    componentDidMount() {
        this.getData().then(() => console.log("received list, list: ", this.state.suggestions));
        navigate("/");
    }
    async getData(){
        const url = `${this.API_URL}/suggestions`;
        const response = await fetch(url);
        const data = await response.json();
        return this.setState({
            suggestions: data
        })
    }
    
    async login(username, password) {
        try {
            const resp = await this.Auth.login(username, password);
            console.log("Authentication:", resp.msg);
            this.getData();
        } catch (e) {
            console.log("Login error: ", e);
        }
    }
    async userLogin(){
        return localStorage.username
     };
    async logout () {
        try {
           this.Auth.logout();
           this.setState({
               loggedIn: false,
           })
            console.log("Logged out")   
        } catch (e) {
            console.log("Login error: ", e);
        }
    };

    getSuggestion(id){
        return this.state.suggestions.find(suggestion => suggestion._id ===id);
    };

     getSignatureMax(id, number){
         try{
            const value = this.getSignature(id, number)
             return console.log(value);
         }
         catch (e) {
            console.log("Login error: ", e);
         }
     }


    async postSignature(signature, suggestionId) {
        const url = `${this.API_URL}/suggestions/${suggestionId}`;
        const token = localStorage.getItem("token");
        const response = await fetch(url ,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + [token],
                    },
            method: 'POST',
            body: JSON.stringify({
                text: signature,
                //number: signature
            })
        });
        const data = await response.json();
        await this.getData();
        console.log("Printing the response:", data);
    };
    setSignature(signature, suggestionId){
        if(signature!==""){
            this.postSignature(signature, suggestionId);
            this.getData();
        }
    }



  render() {    
    return(
        <>
        <ErrorBoundary>
          <h1>Auctioneer</h1>
            <Nav />
                <Router>
                    <AllAuctions path="/" data={this.state.suggestions}/>
                    <OneAuction path="/suggestion/:id"
                    getSuggestion={(id) => this.getSuggestion(id)}
                    submit={(signature, suggestionId) => this.setSignature(signature, suggestionId)}
                    />
                    <Login path="/login" login={(username, password) => this.login(username, password)}/>
                </Router>
            <button><Link to="/">Back</Link></button><br/>
            <button onClick={_ => this.logout()}>Logout</button>
            {this.Auth.loggedIn() ? <p>Logged in as {localStorage.username}</p> : <p>Not logged in</p>}
        </ErrorBoundary>
        </>
    )
  }
}

export default App;