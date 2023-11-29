import React, { useEffect, useState, useRef } from "react";
import SideBar from "./SideBar";
import "../../styles/Doctor-ui/Doctorchat.css";
import Youroheader from '../Youro-header';
import { API_DETAILS, COOKIE_KEYS } from "../../App";
import Cookies from "js-cookie";
import Loader from "../../utils/loader";
import axios from "axios";

const PatientChat =(props)=>
{

    const [viewVal, setViewVal] = useState(0);
    const navToProfile = () => {
        props.changeView(4);
    }
    useEffect(() => {
        if(viewVal == 4){
          navToProfile();
        }
      }, [viewVal]);

    const [chatHistory, setChatHistory] = useState(null);
    const [seletedChat, setSelectedChat] = useState(null);
    const [chatData, setChatData] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchData, setSearchData] = useState(null);
    const [totalMssgCount, setTotalMssgCount] = useState(0);
    var flag = 0

    useEffect(() => {
        getChatHistory();
        setInterval(() => getChatHistory(false), 60000);
      }, []);

    useEffect(() => {
        if(flag == 0){
            getChatUsers();
            flag += 1
        }        
    }, [chatHistory])

    useEffect(() => {
        if(seletedChat) getChat();
    }, [seletedChat])

    useEffect(() => {
        getChat(false)
    }, [chatHistory])

    const [activeLoader, setActiveLoader] = useState(false);

    const divRef = useRef(null);


    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatData]);


    const getChatHistory = async(reload = true) => {
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getChatHistory/${Cookies.get(COOKIE_KEYS.userId)}`;
        if(reload) setActiveLoader(true);

        try {           
            const res = await axios.get(url);
            await setChatHistory(res.data)
            const response = res.data
            var total = 0
            for(var i = 0; i<response.length; i++){
                total += response[i].count
            }
            setTotalMssgCount(total)
            setActiveLoader(false)
        }
        catch (err) {
            console.error(err);
            setActiveLoader(false);
        }
    }

    const getChat = async(reload = true) => {
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getChat/${Cookies.get(COOKIE_KEYS.userId)}/${seletedChat}`;
        if(reload) setActiveLoader(true);

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

    const getChatUsers = async () => {
        const url = API_DETAILS.baseUrl+ API_DETAILS.PORT + `/youro/api/v1/getChatUsers/${Cookies.get(COOKIE_KEYS.userId)}`;
        // setActiveLoader(true);

        try {           
            const res = await axios.get(url);
            const dupChatHistory = [...chatHistory]
            const response = res.data;
            var dupSearchData = []

            for(var i = 0; i< response.length; i++){
                var flag = 0
                for(var j = 0; j<dupChatHistory.length; j++){
                    if(response[i].userId == dupChatHistory[j].uId){
                        flag = 1
                        break;
                    }
                }
                var dic = {}
                if(flag != 1){
                    
                    dic.uId = response[i].userId
                    dic.picture = response[i].image
                    dic.name = response[i].fullName
                    dic.email = response[i].userEmail                   
                }else{
                    dic = dupChatHistory[j]
                    dic.email = response[i].userEmail
                }

                
                dupSearchData.push(dic)
            }

            setSearchData(dupSearchData)
            // setActiveLoader(false);
        }
        catch (err) {
            console.error(err);
            // setActiveLoader(false);
        }
    }

    const ChatNamesUi = (props) => {
        return (
            <div className={`select-names-div ` + (props.data.uId == seletedChat ? 'select-names-active' : '')} onClick={() => setSelectedChat(props.data.uId)}>
                {/* <h3>{data.name}</h3> */}

                    <div style={{height: 'inherit'}}>
                        <img style={{height: '60px', width: '60px', borderRadius: '100%'}}
                        src={props.data.picture? `data:image/png;base64,${props.data.picture}`: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1697800963~exp=1697801563~hmac=a964f83412aeedf85e035a4192fe19e1c7001f7ec339ba51104c9372481f77c9'}
                        className='' alt="Patient Image"/>
                    </div>
                    <div>
                        <p style={{margin: '10px', fontWeight: '900', fontSize: 'large', whiteSpace: 'nowrap' , textOverflow: 'ellipsis', display: 'inline'}}>{props.data.name}</p>{props.data.count && props.data.count !=0 && <p className="mssg-count-ui">{props.data.count}</p>}
                        <p style={{margin: '10px'}}>{props.data.message ? props.data.message : <span style={{fontSize: '10px'}}>start conversation</span>}</p>
                    </div>
                
            </div>
        )
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveChat()
          }
    }


    var loadingClass = isLoading ? 'chatApp__convButton--loading' : '';
    let sendButtonIcon =  !isLoading ? <span class="material-symbols-outlined">send</span> : '';

  return (
        <div style={{width: '100%'}}>
            <Loader active={activeLoader}/>
         {/* <div className='sidebar'>
        </div> */}
        {/* <div style={{display:'flex',flexDirection:'column',margin:'0% 2%',width:'100%'}}>  */}
          {/* <Youroheader/> */}
          <Youroheader setView={setViewVal}/>
            
            <div className="chat-container-main">
                <div className="select-names">
                    <div style={{margin: '0px auto 20px auto', width: '90%'}}>
                        <input type="text" className="text-input-styled" onChange={(e) => setSearchInput(e.target.value)} placeholder="Search or start new chat"></input>
                    </div>
                    
                    {!searchInput && chatHistory && chatHistory.map((data) => {
                        return (
                            <ChatNamesUi data={data}/>                            
                        )
                    })}

                    {((chatHistory && !chatHistory[0]) || searchInput) && searchData && searchData.map((data) => {
                        return (
                            <>
                            {(data.name.toLowerCase().includes(searchInput.toLowerCase()) || (data.email && data.email.toLowerCase().includes(searchInput.toLowerCase()))) &&
                                <ChatNamesUi data={data}/> }
                            </>                           
                        )
                    })}
                    


                </div>

                
                {seletedChat ? <div className="selected-chat-view" onKeyDown={handleKeyDown}>
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

                            {chatData && !chatData[0] && <>
                                <div style={{margin: '0px auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <img src={require('../../assets/Chat-Wave.png')} alt='Say Hello' style={{width: '50%'}}></img>
                                    <p style={{textAlign: 'center', fontSize: '1.5rem'}}><strong>Say "Hello"</strong></p>
                                
                                </div>
                            </>}
                            
                        </div>
                        {/* <div className="chat-received-text">Hello<span className="chat-time-stamp">&nbsp;&nbsp;12:20</span></div>
                        <div className="chat-sent-text">How are you doing today?</div> */}


                    </div>
                    <div style={{display: 'flex', alignItems: 'center', marginTop: '30px', justifyContent: 'space-between', width: '98%'}}>
                            <input type="textbox" className='text-input-styled' placeholder="Type your message here...." onChange={(e) => setMessage(e.target.value)} value={message}/>
                            <div className={'chatApp__convButton ' + loadingClass} onClick={() => {setIsloading(true); saveChat()}}>
                                {sendButtonIcon}
                            </div>

                        </div>
                </div> : <div style={{margin: '0px auto'}}>
                        <img src={require('../../assets/no_selection_chat.png')} alt='No selected chat' style={{height: '80%'}}></img>
                        <p style={{textAlign: 'center', fontSize: '1.5rem'}}><strong>Select a chat to display</strong></p>
                    
                    </div>}
            </div>  
        {/* </div> */}
       </div>
    )
}
export default PatientChat;



