import React, { useState } from "react"
import { getUser} from './../../services/auth';
const Profile = () => {
    const [username, setUsername] = useState(getUser.name);
    const [email, setEmail] = useState(getUser.email);
    return(<>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {username}</li>
        <li>E-mail: {email}</li>
      </ul>
    </>)
    
}
   

export default Profile