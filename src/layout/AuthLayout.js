import { ReactComponent as SVGIcon } from "../assets/images/chat.svg";

const AuthLayout = ({ children }) => {
    return (
        <div>
            <nav className='flex items-center justify-center'>
                <SVGIcon className='chat-icon' />
                <p className='chat-slogan'>Let's get chatty</p>
            </nav>
            {children}
        </div>
    );
};

export default AuthLayout;