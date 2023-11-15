import React, { Component } from 'react';
import AuthGG from './authGG';

class LoginGG extends Component {
   
    render() {
        const location = window.location;
        return (
            <div>
                <AuthGG location={location}/>
            </div>
        );
    }
}

export default LoginGG;