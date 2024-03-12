import './Nav.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {

    const handleClickOutside = (event) => {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.style.display === "block") {
                    openDropdown.style.display = "none";
                }
            }
        }
    }

        useEffect(() => {
            window.addEventListener('click', handleClickOutside);
            return () => {
                window.removeEventListener('click', handleClickOutside);
            };
        }, []);


    return (
        <nav className="navbar">
        <div className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
            <Link to="/">Home</Link>
            
            <Link to="/articles">Articles</Link>
            
          </div>
        </div>
      </nav>
    )
}

export default Nav