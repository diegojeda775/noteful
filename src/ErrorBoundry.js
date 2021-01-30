import React, { Component } from 'react';

export default class ErrorBoundry extends Component {
    
    constructor(props){
        super(props);
        this.state={
            hasError: false
        }
    }

    static getDerivedStateFromError(error){
        console.log(error);
        return {hasError: true};
    }

    render() {
        if(this.state.hasError){
            return <div> Error: </div>;
        }else{
            return this.props.children;
        }
    }
}