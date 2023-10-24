import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="main-footer">
      <div className="footer-left">
        <h2 id="h1"><span className="flow"></span> SweetOrganic</h2>
      </div>
      <p>{new Date().getFullYear()} - Tous droits réservés</p>
      <div className="footer-right">
        <ul>
          <li><a href="https://www.facebook.com/"><i className="fa-brands fa-facebook-f"></i></a></li>
          <li><a href="https://twitter.com/"><i className="fa-brands fa-twitter"></i></a></li>
          <li><a href="https://discord.com/"><i className="fa-brands fa-discord"></i></a></li>
        </ul>
      </div>
    </div>
    </footer>
  )
}

export default Footer