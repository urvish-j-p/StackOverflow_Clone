import React from 'react';
import './LeftSidebar.css';
import { NavLink } from 'react-router-dom';
import Globe from '../../assets/earth-africa-solid.svg';
import close from '../../assets/xmark-solid.svg';

const LeftSidebar = () => {
  const handleClose = () => {
    const navbar = document.getElementById('sidebar');
    navbar.style.left = '-40%';
    // setIsOpen(false);
    // const menuBtn = document.getElementById('menu-btn');
    // menuBtn.style.display = 'block';
    // const closeBtn = document.getElementById('close-btn');
    // closeBtn.style.display = 'none';
  };

  return (
    <div className="left-sidebar" id="sidebar">
      {/* {isOpen ? ( */}
      <button onClick={handleClose} className="close-btn" id="close-btn">
        <img src={close} alt="" width="18" />
      </button>
      <nav className="side-nav">
        <NavLink to="/" className="side-nav-links" activeClassName="active">
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink
            to="/Questions"
            className="side-nav-links"
            activeClassName="active"
          >
            <img src={Globe} alt="Globe" width="15px" />
            <p style={{ paddingLeft: '10px' }}>Questions</p>
          </NavLink>
          <NavLink
            to="/Tags"
            className="side-nav-links"
            activeClassName="active"
            style={{ paddingLeft: '35px' }}
          >
            <p>Tags</p>
          </NavLink>
          <NavLink
            to="/Users"
            className="side-nav-links"
            activeClassName="active"
            style={{ paddingLeft: '35px' }}
          >
            <p>Users</p>
          </NavLink>
          {/* <NavLink
            to="/Community"
            className="side-nav-links"
            activeClassName="active"
            style={{ paddingLeft: '35px' }}
          >
            <p>Community</p>
          </NavLink> */}
        </div>
      </nav>
      {/* ) : (
        <></>
      )} */}
    </div>
  );
};

export default LeftSidebar;