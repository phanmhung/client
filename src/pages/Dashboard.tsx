import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Dashboard() {
    const [messages, setMessages] = React.useState<{text:string;author:string}[]>([]);
    const [author, setAuthor] = React.useState<string>('');
    const [text, setText] = React.useState<string>('');
    //get messages from server
    const getMessages = () => {
        axios.get('http://localhost:8000/').then((res) => {
            console.log(res.data);
            setMessages(res.data);
        });
    }
    useEffect(() => {
        getMessages();
    },[]);
    //send message to server
    const sendMessage = () => {
        if(text==='' || author==='') return;
        console.log(text, author);
        axios.post('http://localhost:8000/new', {
            text,
            author
    }).then((res) => {
        console.log(res.data);
        setMessages(res.data);
    })};

  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    }}>
        <h1>Messeage</h1>
        {messages.map((message,index) => (
            <div key={index}>
                {message.author} :
                <span>
                    {message.text}
                </span>
            </div>
        ))}
        <div style={
            {
                display: 'flex',
                alignItems: 'center',
            }
        }>
            <h3>Your name:</h3>
            <input type="text" onChange={(e)=>setAuthor(e.target.value)}/>
        </div>
        <div style={
            {
                display: 'flex',
                alignItems: 'center',
            }
        }>
            <h3>Your message:</h3>
            <input type="text" onChange={(e)=>setText(e.target.value)}/>
        </div>
        <button onClick={()=>sendMessage()}>Send</button>
        <div className="link">
            <Link to={'/average'}>Go to Average</Link>
        </div>
    </div>
  )
}

export default Dashboard