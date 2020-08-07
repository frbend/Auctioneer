//from react docs --> displays fallback UI in production if there are errors on the page
//https://reactjs.org/docs/error-boundaries.html
import React from "react";


class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
      console.log(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong, please refresh the page.</h1>;
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary;