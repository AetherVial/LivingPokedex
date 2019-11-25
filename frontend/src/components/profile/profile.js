import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axios.get('/api/users/current')
            .then(res => setCurrentUser(res.data))
    }, [])

   
    if (currentUser) {
        return (
            <div>
                <h2>Welcome {currentUser.handle}</h2>
            </div>
        );
    } else {
        return (
            <div>   
            </div>
        )
    }    
}

export default Profile;