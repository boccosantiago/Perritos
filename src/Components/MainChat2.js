import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../context/AuthContext";
import { ChatContext } from "../context/Chat";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Moment from "react-moment";
import "../styles/Chat.css"

export default function MainChat(props) {

    //const navigate = useNavigate();
    const { user } = useContext(authContext);
    const { sendMessage, getChatHistory, chatData, loading, updateChatHistory } =
        useContext(ChatContext);
    const [messageToSave, setMessageToSave] = useState("");
    console.log(props.userClicked)
    

    useEffect(() => {
        // if (!persistUser()) {
        //     return navigate("/login");
        // }

        getChatHistory();
        //eslint-disable-next-line
    }, []);

    // const signUserOut = () => {
    //     signOut();
    //     navigate("/login");
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email } = user;
        await sendMessage(email, messageToSave);
        updateChatHistory();
        setMessageToSave("");
    };

    const chatHistory =
        chatData.length > 0
            ? chatData.sort((a, b) => {
                return a.time - b.time;
            })
            : null;

    if (loading) {
        return <div className="loading-chat" >Loading chat...</div>;
    }


    return (
        <div>
            <div className='chat-grid'>
                {/* <div className='sidebar'>
                        <p>Signed in as {props.user?.email}</p>
                        <p onClick={signUserOut} className='sign-out'>
                            Sign out
                        </p>
                    </div> */}
                <div className='chat'>
                    {/* usuario chat */}
                    {chatHistory ?
                        chatHistory.map((c) => {
                            return c.from === user.email ? (
                                <div key={c.time} className='user-chat'>
                                    <div className='chat-info'>
                                        {c.from} on
                                        <span>
                                            <Moment format='MMMM DD, YYYY HH:mm'>{c.time}</Moment>
                                        </span>
                                    </div>
                                    {c.message}
                                </div>
                            ) : (
                                <div key={c.time} className='sender-chat'>
                                    <div className='chat-info'>
                                        {c.from} on
                                        <span>
                                            <Moment format='MMMM DD, YYYY HH:mm'>{c.time}</Moment>
                                        </span>
                                    </div>
                                    {c.message}
                                </div>
                            );
                        }) : <div></div>}
                </div>
            </div>
            <div className='chat-form-container'>
                <form onSubmit={handleSubmit} className='chat-form'>
                    <div className='chat-input-container'>
                        <input
                            className='chat-input'
                            type='text'
                            value={messageToSave}
                            onChange={(e) => setMessageToSave(e.target.value)}
                        />
                        <input className='chat-send' type='submit' value='Send' />
                    </div>
                </form>
            </div>
        </div>
    );
};

