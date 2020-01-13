import React, { Component } from 'react';
import UserContext from './UserContext';
import Cookies from 'js-cookie';

class GlobalState extends Component {
    state = {
        username: Cookies.get("username"),
        _id: Cookies.get("_id")
    };

    login = async user => {

        await fetch("/api/user/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                password: user.hash
            })
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    fetch("/api/session/new", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: user.username
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (!data.error) {
                                Cookies.set("username", data.username);
                                Cookies.set("_id", data._id);
                                this.setState({
                                    username: data.username,
                                    _id: data._id,
                                    authenticated: true
                                });
                            }
                        })
                }
            });
    };

    logout = async () => {
        fetch("/api/session/terminate", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: this.state._id
            })
        });
        Cookies.remove("username");
        Cookies.remove("_id");
    };

    verify = async () => {
        const response = await fetch("/api/session/validate", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: this.state._id,
                username: this.state.username
            })
        });
        if (response.ok) {
            return true;
        }
        else {
            this.logout();
            return false;
        }
    }

    render() {
        return (
            <UserContext.Provider value={{
                username: this.state.username,
                _id: this.state._id,
                login: this.login,
                logout: this.logout,
                verify: this.verify
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default GlobalState