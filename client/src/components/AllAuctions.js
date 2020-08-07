import React, {Component} from "react";
import {Link} from '@reach/router';

class AllAuctions extends Component{


    render() {
        
        const data = Array.from(this.props.data);
        const list = data.map(
            list => <><li key={list._id}>
                <Link to={`/suggestion/${list._id}`}>{list.title}<br/><br/></Link>
                    <p>highest amount would be here</p>
            </li><br/>
            </>
        );
        return(
            <>
                <h3>Items for sale</h3>
                <ul>{list}</ul>
            </>
        )
    }
}

export default AllAuctions;