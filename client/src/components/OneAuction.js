import React, {Component} from "react";
import AddBid from "./AddBid";



class OneSuggestion extends Component{

    submit(signature) {
        this.props.submit(signature, this.props.id);
    }




    renderSignatures(){

        const suggestion = this.props.getSuggestion(this.props.id);
        if (suggestion === undefined){
            return <p>we have nothing here</p>
        }
        else {
            return suggestion.signatures.map(signature => <section>
                <ul>
                    <li>{signature.text}</li>
                </ul>
            </section>);
        }
    }

    render() {

        const suggestion = this.props.getSuggestion(this.props.id);

        return(
            <>
                <h3>Title:{suggestion.title}</h3>
                <h3>Signatures</h3>
                <section>
                <AddBid />
                    {/* <h3>{this.props.submit}</h3> */}
                </section>
            </>
        );
    }
}

export default OneSuggestion;