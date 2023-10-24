import React from "react";
import {Link, NavLink} from 'react-router-dom';
import './header.css'

const Header = () =>{

    const isHereNav = ({isActive}) =>{
        return {
            color: isActive ? 'rgb(147,124,249)':'',
            fontWeight: isActive ? 'bold':'normal',
        }
    }

    const isHereServices = ({isActive}) =>{
        return {
            color: isActive ? 'rgb(147,124,249)':'',
            border: isActive ? '1px solid rgb(147,124,249)':'none',
            fontWeight: isActive ? 'bold':'normal',
        }
    }

    return (
        <header>
            <div className="left">
                <h1>Sweet Organic</h1>
                <nav className="mainNav">
                    <ul>
                        <li><NavLink to="/" className="link" style={isHereNav} >Accueil</NavLink></li>
                        <li><NavLink to="/products" className="link" style={isHereNav}>Products</NavLink></li>
                    </ul>
                </nav>
            </div>
            
            <nav className="serviceNav">
                <ul>
                    <li><NavLink to="/signup" className="link" style={isHereServices}>Sign up</NavLink></li>
                    <li><NavLink to="/signin" className="link" style={isHereServices}>Sign in</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;