import './Nav.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const Nav = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (!event.target.matches('.dropbtn')) {
            setMenuOpen(false);



            // const dropdowns = document.getElementsByClassName("dropdown-content");
            // for (let i = 0; i < dropdowns.length; i++) {
            //     const openDropdown = dropdowns[i];
            //     if (openDropdown.style.display === "block") {
            //         openDropdown.style.display = "none";
            //     }
            // }
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
            <button className="dropbtn" onClick={toggleMenu}>Menu</button>
            {menuOpen && (
                <div className="dropdown-content">
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/topics" onClick={() => setMenuOpen(false)}>Topics</Link>
                    <Link to="/articles" onClick={() => setMenuOpen(false)}>Articles</Link>
                </div>
            )}
        </div>
    </nav>
    )
}

export default Nav