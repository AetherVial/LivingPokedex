import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }
    render() {
        return (
            <React.Fragment>
            <div className="NavBar">
                <h1>Pokedex Tracker</h1>
            </div>
            <div className="NavBar">
                {this.getLinks()}
            </div>
            </React.Fragment>
        );
    }
}

export default NavBar;