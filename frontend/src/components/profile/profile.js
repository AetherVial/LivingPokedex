import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./profile.css";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        axios.get('/api/users/current')
            .then(res => setCurrentUser(res.data))
    }, [])

    const getPKMN = () => {
        if (currentUser.pokemon) {
            return (<div>{currentUser.pokemon.length} / 809</div>)
        }
    }
    
    if (currentUser) {
        return (
            <div className="Profile">
                <h2>Welcome {currentUser.handle}</h2>
                {getPKMN()}
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