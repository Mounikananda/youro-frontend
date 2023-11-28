import React, { useEffect, useState, useRef } from "react";
import DoctorSideBar from './Doctor-Sidebar';
import "../../styles/Doctor-ui/Doctorchat.css";
import Youroheader from '../Youro-header';
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";
import Loader from "../../utils/loader";
import axios from "axios";

const DoctorChat =()=>
{
    const [chatHistory, setChatHistory] = useState(null);
    const [seletedChat, setSelectedChat] = useState(null);
    const [chatData, setChatData] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        getChatHistory();
      }, []);

    useEffect(() => {
        getChat();
    }, [seletedChat])

    const [activeLoader, setActiveLoader] = useState(false);

    const divRef = useRef(null);


    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatData]);

    const getChatHistory = async() => {
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getChatHistory/${Cookies.get(COOKIE_KEYS.userId)}`;
        setActiveLoader(true);

        try {           
            const res = await axios.get(url);
            setChatHistory(res.data)
            setActiveLoader(false)
        }
        catch (err) {
            console.error(err);
            setActiveLoader(false);
        }
    }

    const getChat = async() => {
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getChat/${Cookies.get(COOKIE_KEYS.userId)}/${seletedChat}`;
        setActiveLoader(true);

        try {           
            const res = await axios.get(url);
            setChatData(res.data)
            setActiveLoader(false);
        }
        catch (err) {
            console.error(err);
            setActiveLoader(false);
        }
    }

    const saveChat = async() => {
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/saveChat`;
        const data = {
            "msg": message,
            "from": parseInt(Cookies.get(COOKIE_KEYS.userId)),
            "to": seletedChat
        }

        axios.post(url, data).then(res => {
            setChatData(res.data)
            setActiveLoader(false)
            

            var dupChatData = [...chatData]
            var mssg = {
                "message": message,
                "fromId": parseInt(Cookies.get(COOKIE_KEYS.userId)),
                "toId": seletedChat,
                "time": new Date()
            }

            dupChatData = [mssg].concat(dupChatData)

            setChatData(dupChatData)
            setIsloading(false);
          }).catch(err => {     
            console.error(err);
            setIsloading(false);
          })
          

        setMessage('')
    }


    var loadingClass = isLoading ? 'chatApp__convButton--loading' : '';
    let sendButtonIcon =  !isLoading ? <span class="material-symbols-outlined">send</span> : '';

  return (
        <div>
            <Loader active={activeLoader}/>
         <div className='doctor-chat'>
         <div className='sidebar'>
         <DoctorSideBar data={'doctor-chat'}/>
        </div>
        <div style={{display:'flex',flexDirection:'column',margin:'0% 2%',width:'100%'}}> 
          <Youroheader/>
        <div style={{}}>
            {/* <Youroheader/> */}
            <div className="chat-container-main">
                <div className="select-names">
                    {chatHistory && chatHistory.map((data) => {
                        return (
                            <div className="select-names-active" onClick={() => setSelectedChat(data.uId)}>
                                {/* <h3>{data.name}</h3> */}

                                    <div style={{height: 'inherit'}}>
                                        <img style={{height: '60px', minWidth: '60px', borderRadius: '100%'}}
                                        src={data.picture? `data:image/png;base64,${data.picture}`: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                                        className='' alt="Patient Image"/>
                                    </div>
                                    <div>
                                        <p style={{margin: '10px', fontWeight: '900', fontSize: 'large'}}>{data.name}</p>
                                        <p style={{margin: '10px'}}>{data.message}</p>
                                    </div>
                                
                            </div>
                            
                        )
                    })}
                    
                    {/* <div>
                        <h3>Sai charan</h3>
                        <p>Hi doctor iam feeling well now</p>
                    </div>

                    <div>
                        <h3>vamshi</h3>
                        <p>hi doctor,medicine 1 is available now</p>
                    </div> */}


                </div>

                
                {seletedChat ? <div className="selected-chat-view">
                    <div id='chat-scroll' style={{width: '100%', paddingLeft: '15px', height: '82vh', overflowY: 'auto'}}>  
                        {/* <div className="chat-timestamp">Today, 8:30 PM</div> */}
                        <div style={{display: 'flex', flexDirection: 'column-reverse', padding: '20px'}}>
                            <div ref={divRef}></div>
                            {chatData && chatData.map((data, i) => {
                                var timestamp = new Date(data.time)
                                var k = chatData[i+1] ? new Date(chatData[i+1].time): ''
                                var prevTimeStamp = k? k.toLocaleDateString(): ''
                                
                                return (
                                    <>
                                    <div className={data.fromId == Cookies.get(COOKIE_KEYS.userId) ? "chat-sent-text" : "chat-received-text" }>{data.message}<span className="chat-time-stamp">&nbsp;&nbsp;{timestamp.toLocaleTimeString().split(':')[0]+':'+timestamp.toLocaleTimeString().split(':')[1] + ' ' + timestamp.toLocaleTimeString().split(' ')[1]}</span></div>
                                    {!prevTimeStamp || (prevTimeStamp && (prevTimeStamp != timestamp.toLocaleDateString())) ? <div className="chat-timestamp">{timestamp.toLocaleDateString()}</div> : ''}
                                    
                                    </>
                                )
                                
                            })}
                            
                        </div>
                        {/* <div className="chat-received-text">Hello<span className="chat-time-stamp">&nbsp;&nbsp;12:20</span></div>
                        <div className="chat-sent-text">How are you doing today?</div> */}

                        

                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '30px', justifyContent: 'space-between', width: '98%'}}>
                            <input type="textbox" placeholder="Type your message here...." onChange={(e) => setMessage(e.target.value)} value={message}/>
                            <div className={'chatApp__convButton ' + loadingClass} onClick={() => {setIsloading(true); saveChat()}}>
                                {sendButtonIcon}
                            </div>

                        </div>
                </div> : <div style={{margin: '0px auto'}}>
                        <img src={require('../../assets/no_selection_chat.png')} alt='No selected chat' style={{height: '80%'}}></img>
                        <p style={{textAlign: 'center', fontSize: '1.5rem'}}><strong>Select a chat to display</strong></p>
                    
                    </div>}
            </div>  
        </div>
        </div>
       </div>
       </div>
    )
}
export default DoctorChat;



