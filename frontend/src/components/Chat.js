import React,{ useState,useEffect } from 'react'

const Chat = ({socket,username,room}) => { 
    const [msg, setnewmsg] = useState(""); 
    const sendmsg = async() =>{ 
        if (msg !== ""){ 
            const msgdata = { 
                room: room, 
                author: username,
                message: msg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }; 
        
        await socket.emit("send_msg",msgdata); 
        }
    }; 
    useEffect(() => {
        socket.on("recieve_msg", (data) =>{
            console.log(data);
        })
    },[socket]) 
    return (
        <div>
            <div className="chat-header">
                <p>Chatter</p>
            </div> 
            <div className="chat-body"></div> 
            <div className="chat-footer">
                <input type="text" placeholder="Type text here" onChange={(event) =>{
                    setnewmsg(event.target.value);
                }} />
                <button onClick={sendmsg}>&#9658;</button>
            </div>
        </div>
    )
} 

export default Chat;
