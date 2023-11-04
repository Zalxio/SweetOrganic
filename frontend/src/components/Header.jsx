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
                <img src="/sw.png" alt="logo" />
                <h1><span className="sweet">Sweet</span> <span className="organic">Organic</span></h1>
                <nav className="mainNav">
                    <ul>
                        <li><NavLink to="/" className="link" style={isHereNav} >Accueil</NavLink></li>
                        <li><NavLink to="/products" className="link" style={isHereNav}>Produits</NavLink></li>
                    </ul>
                </nav>
            </div>
            <nav className="serviceNav">
                <ul>
                    <li><NavLink to="/signup" className="link" style={isHereServices}>S'inscrire</NavLink></li>
                    <li><NavLink to="/signin" className="link" style={isHereServices}>Se connecter</NavLink></li>
                    <li><NavLink to="/cart" className="link" style={isHereServices}>
                        <i class="fa-solid fa-cart-shopping"></i>
                    </NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;