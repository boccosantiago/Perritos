import React, { useContext } from "react";
import Cam from "../Chat2/Img/cam.png"
import Add from "../Chat2/Img/add.png";
import More from "../Chat2/Img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext);

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;