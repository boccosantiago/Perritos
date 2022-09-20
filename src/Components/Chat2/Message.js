import React, { useContext, useEffect, useRef } from "react";
import { authContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
    const { user } = useContext(authContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.user?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div
            ref={ref}
            className={`message ${message.senderId === user.uid && "owner"}`}
        >
            <div className="messageInfo">
                <img
                    src={
                        message.senderId === user.uid
                            ? user.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;