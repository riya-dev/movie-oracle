import { useState, useEffect } from 'react';

const NavBar = () => {
  return (
    <>
        <div
            className="navbar">
                <button className="adult-button">Adult Content</button>
      </div>
    </>
  );
};

interface NavBarIconProps {
  icon: React.ReactNode;
  text: string;
  link: string;
}

const NavBarIcon: React.FC<NavBarIconProps> = ({ icon, text, link }) => (
  <a href={link} className="navbar-icon group">
    {icon}
    <span className="navbar-tooltip group-hover:scale-100">{text}</span>
  </a>
);

const Divider: React.FC = () => <hr className="navbar-hr" />;

export default NavBar;
