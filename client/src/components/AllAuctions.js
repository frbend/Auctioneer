import React, {Component} from "react";
import {Link} from '@reach/router';

class AllSuggestions extends Component{


    render() {
        
        const data = Array.from(this.props.data);
        const list = data.map(
            list => <><li key={list._id}>
                <Link to={`/suggestion/${list._id}`}>{list.title}<br/></Link>
            </li><br/>
            </>
        );
        return(
            <>
                <h3>Suggestions</h3>
                <ul>{list}</ul>
            </>
        )
    }
}

export default AllSuggestions;