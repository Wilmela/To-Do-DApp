import React, { useState } from 'react';
import './Navbar.scss';

import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

import LOGO from '../../assets/images/mela-logo.png';

function ListItem({ title, handleClick, className }) {
  return <a href="/" className={className} onClick={handleClick}>{title}</a>;
}

function Navbar() {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="nav-container header">
      <div className="nav-logo">
        <img src={LOGO} alt="logo" className="nav-logo-img" />
      </div>

      <ul className="nav-links">
        {['Home', 'About'].map((item, i) => (
          <div key={i}>
            <ListItem title={item} className="nav-link-item" />
          </div>
        ))}
      </ul>

      <div className="nav-mobile">
        {toggle ? <AiOutlineClose fontSize={23} color="#fff" onClick={() => setToggle(false)} /> : <FiMenu fontSize={23} className="nav-icons" onClick={() => setToggle(true)} />}
        {toggle && (
        <ul className="mobile-menu">
          <li><AiOutlineClose fontSize={23} className="nav-icons" onClick={() => setToggle(false)} /></li>
          {['Home', 'About'].map((item, i) => (
            <div key={i} className="mobile-menu-items">
              <ListItem title={item} className="nav-link-item" handleClick={() => setToggle(false)} />
            </div>
          ))}
        </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
