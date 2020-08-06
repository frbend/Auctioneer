import React, {Component} from "react";
import {Link} from '@reach/router';

class AllAuctions extends Component{

    // async renderHighest() {
    //     const suggestion = this.props.renderBids(this.props.id);
    //     const highest =  suggestion.signatures.sort(signature =><section>
    //             <p>{signature.text}</p>
    //     </section>)
    //     return highest

    // }


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