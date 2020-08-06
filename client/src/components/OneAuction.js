import React, {Component} from "react";
import AddBid from "./AddBid";



class OneAuction extends Component{

    constructor(props){
        super(props);
        this.renderBids = this.renderBids.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
    }

    submit(signature) {
        this.props.submit(signature, this.props.id);
    }

    renderBids(){
        const suggestion = this.props.getSuggestion(this.props.id);

        return suggestion.signatures.map(signature => <section>
            <ul>
                <li>{signature.text}</li>
            </ul>
        </section>)
        }
    renderTitle(){
            const suggestion = this.props.getSuggestion(this.props.id);
            return suggestion.title
        }


    render() {
        const suggestion = this.props.getSuggestion(this.props.id);

        return(
            <>
                <h3>Title:{this.renderTitle()}</h3>
                <h3>Author:{suggestion.author}</h3>
                <h3>Description:<br /><br />{suggestion.description}</h3>
                <h3>Bids</h3>
                <section>{this.renderBids()}</section>
                <AddBid submit={(signature) => this.submit(signature)}></AddBid> 
            </>
        );
    }
}

export default OneAuction;