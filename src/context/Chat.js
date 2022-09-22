import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    query
} from "firebase/firestore";
import { db } from "../firebase";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
    // state del chat
    const [chatData, setChatData] = useState({
        from: "",
        to: "",
        time: "",
        message: ""
    });

    const [loading, setLoading] = useState(true);
    
    // saving messages
    const sendMessage = async (from, message) => {
        try {
            if (message === "") return;
            const docRef = await addDoc(collection(db, "ChatDevApp"), {
                from: from,
                message: message,
                time: Date.now()
            });

            return docRef;
        } catch (error) {
            console.error("Error sending message ", error);
        }
    };

    // get chat history
    const getChatHistory = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "ChatDevApp"));

            let tempChatData = [];
            querySnapshot.forEach((doc) => {
                if (doc.exists()) {
                    tempChatData.push({ id: doc.id, ...doc.data() });
                    setChatData([...tempChatData]);
                    setLoading(false);
                }
            });
            const chatDiv = document.querySelector(".chat");
            chatDiv.scrollTop = chatDiv.scrollHeight;
        } catch (error) {
            console.error(error);
            console.log("Error getting chat history ", error);
        }
    };

    // update chat history
    const updateChatHistory = () => {
        const q = query(collection(db, "ChatDevApp"));
        onSnapshot(q, (querySnapshot) => {
            let tempChatData = [];
            querySnapshot.forEach((doc) => {
                tempChatData.push({ id: doc.id, ...doc.data() });
                setChatData([...tempChatData]);
                setLoading(false);
            });
            const chatDiv = document.querySelector(".chat");
            chatDiv.scrollTop = chatDiv.scrollHeight;
        });
    };

    return (
        <ChatContext.Provider
            value={{
                sendMessage,
                getChatHistory,
                chatData,
                loading,
                updateChatHistory
            }}>
            {children}
        </ChatContext.Provider>
    );
};