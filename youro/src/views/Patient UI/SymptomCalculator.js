import React, {useState} from "react";
import Popup from 'reactjs-popup';

const SymptomCalculator = (props) => {
    return (
            <Popup open={props.open} modal closeOnDocumentClick={false} onClose={() => props.setOpen(false)} className="symptom-popup">
                <div style={{position: 'absolute', top: '20px', right: '20px', cursor: 'pointer'}} onClick={() => {props.setOpen(false)}}>
                    <span class="material-symbols-outlined">
                    close
                    </span>
                </div>
                <div style={{padding: '30px 50px'}}>
                    <div style={{textAlign: 'center'}}>
                        <h2>Symptom Calculator</h2>
                        <p>Question 1 out of 10</p><br/>
                    </div>
                    <div style={{textAlign: 'start'}}>
                        <p>1. How are you feeling today?</p>
                        <input type="radio" id="html" name="" value="HTML" />
                        <label for="html" style={{marginLeft: '10px'}}>Good</label><br/><br/>
                        <input type="radio" id="html" name="" value="HTML" />
                        <label for="html" style={{marginLeft: '10px'}}>Bad</label><br/><br/>
                        <input type="radio" id="html" name="" value="HTML" />
                        <label for="html" style={{marginLeft: '10px'}}>Neutral</label><br/><br/>
                        <input type="radio" id="html" name="" value="HTML" />
                        <label for="html" style={{marginLeft: '10px'}}>None</label><br/><br/>
                    </div>
                    <div className="btn-filled" style={{width: 'fit-content', marginLeft: 'auto'}}>Next</div>
                
                </div>
                
                
            </Popup>
    )
}

export default SymptomCalculator;