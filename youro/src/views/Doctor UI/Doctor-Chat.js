import react from 'react'
import DoctorSideBar from './Doctor-Sidebar';
import "../../styles/Doctor-ui/Doctorchat.css";

const DoctorChat =()=>
{
  return (
        <div>
         <div className='doctor-chat'>
         <div className='sidebar'>
         <DoctorSideBar/>
        </div>
        <div className="chat-container">
            <h1>Messages</h1>

            <div className="chat-container-main">
                <div className="select-names">
                    <div className="select-names-active">
                        <h3>New Chat</h3>
                    </div>
                    
                    <div>
                        <h3>Sai charan</h3>
                        <p>Hi doctor iam feeling well now</p>
                    </div>

                    <div>
                        <h3>vamshi</h3>
                        <p>hi doctor,medicine 1 is available now</p>
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
        </div>
       </div>
    )
}
export default DoctorChat;



