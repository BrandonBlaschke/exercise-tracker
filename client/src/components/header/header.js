import React, {Component} from 'react';
import './header.css';

const Header = (props) => {
    return (
        <div className="header box">
            <h1>Exercise Tracker</h1>
            <a className="item">LINK 1</a>
            <a className="item">link 1</a>
            <a className="item">link 1</a>
        </div>
    );
}

export default Header;