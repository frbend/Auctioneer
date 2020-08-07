import React, {Component} from 'react';

class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleLogin() {
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        return (
            <>
                <h3>Login</h3>
                <input onChange={event => this.handleChange(event)}
                       name="username" type="text" placeholder="username" /><br/>
                <input onChange={event => this.handleChange(event)}
                       name="password" type="password" placeholder="password" /><br/>
                <button onClick={_ => this.handleLogin()}>Login</button>
            </>
        );
    }
}

export default Login;