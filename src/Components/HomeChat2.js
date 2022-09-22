import React from 'react'
import Sidebar from '../Components/Chat2/Sidebar'
import Chat from '../Components/Chat2/Chat'

const HomeChat = () => {
    return (
        <div className='home'>
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default HomeChat