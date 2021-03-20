import React, {useEffect, useState} from "react";

const weChannel  = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
export type  ChatMessageType =  {
            message:string,
            photo: string
            userId: number,
            userName: string


}


 const ChatPage: React.FC = () => {


    return <div>
        <Chat/>
    </div>

}

const Chat: React.FC = () => {


       return <div>
         <Messages />
         <AddMessageChat  />
     </div>
}
const Messages: React.FC = (props) => {
     const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(()=> {
        weChannel.addEventListener('message', (e:MessageEvent)=> {
            let newMessages = JSON.parse(e.data);
                setMessages((prevMessages)=> [...prevMessages, ...newMessages])
        })
    }, [])


     return <div style={{height:'400px', overflow: "auto"}}>
         {
             messages.map((m, index) =>
             <Message message={m} key={index} />
             )
         }
     </div>
}

const Message: React.FC<{message:ChatMessageType}> = ({message}) => {



     return <div>
     <img  src={message.photo} alt={message.userName}/>
     <br/>
         {message.message}
     </div>
}
const AddMessageChat: React.FC  = () => {
    const [message, setMessage] = useState('');
    


    const sendMessage = () => {
        if(!message){
            return;
        }
        weChannel.send(message)
        setMessage('')
    }

     return <div>
         <div>
             <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}>

         </textarea>
         </div>
         <div>
             <button  onClick={sendMessage}>Send</button>
         </div>

     </div>
}
export default ChatPage;