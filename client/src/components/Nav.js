import React, {Component} from 'react';
import {Link} from "@reach/router";

class Nav extends Component{



    render() {
        return(
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        )
    }
}

export default Nav;