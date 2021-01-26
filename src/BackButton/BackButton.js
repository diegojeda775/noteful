import React from 'react';
import { useHistory } from "react-router-dom";
import './BackButton.css';

function BackButton() {
    let history = useHistory();
    
    return <button type='button' onClick={() => history.goBack()} className='go-back'>Back</button>
        
}

export default BackButton;