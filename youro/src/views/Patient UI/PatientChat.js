import React from "react";

const PatientChat = () => {
    return (
        <div className="chat-container">
            <h1>Messages</h1>

            <div className="chat-container-main">
                <div className="select-names">
                    <div className="select-names-active">
                        <h3>New Chat</h3>
                    </div>
                    
                    <div>
                        <h3>Alan Hunt</h3>
                        <p>How are you feeling today?</p>
                    </div>

                    <div>
                        <h3>Dr. Farah</h3>
                        <p>How are you feeling today?</p>
                    </div>


                </div>
                <div className="selected-chat-view">
                    <div style={{width: '100%', paddingLeft: '15px'}}>  
                        <div className="chat-timestamp">Today, 8:30 PM</div>
                        <div className="chat-received-text">Hello</div>
                        <div className="chat-sent-text">How are you doing today?</div>

                        <div style={{display: 'flex', alignItems: 'center', marginTop: '30px', justifyContent: 'space-between'}}>
                            <input type="textbox" placeholder="Type your message here...."/>
                            <span style={{fontSize: '30px'}} class="material-symbols-outlined">
                                send
                                </span>
                        </div>

                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default PatientChat;