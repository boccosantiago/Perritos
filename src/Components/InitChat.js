import { auth } from "../firebase";
import Chat from "../pages/Chat";
import LogMessage from "./LogMessage";

export default function InitChat() {
  return (
    <div className="publish-post bg-stone-100 h-screen">
      {auth.currentUser ? (
        <Chat />
      ) : (
        <LogMessage
          text={"Inicia sesión para chatear con los demás usuarios"}
        />
      )}
    </div>
  );
}
