import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../../firebase'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    // const { user } = useContext(authContext)
    console.log(user)
    return (
        <div className='navbar'>
            <span className="logo">Lama Chat</span>
            {/* <div className="user">
                {/* <img src={currentUser.photoURL} alt="" /> */}
            {/* <span>{user.email}</span>
            <button onClick={() => logout}>logout</button>
        </div> * /} */}
        </div >
    )
}

export default Navbar