import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import Logo from "../Logo/logo";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<SVGSVGElement>(null);
  const location = useLocation();
  
  // Check if we are on the homepage
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Close menu on window resize (for desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <div className={`header ${isHomePage ? "home-header" : "page-header"}`}>
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <nav>
            <ul 
              id="menuItems" 
              ref={menuRef}
              className={menuOpen ? "active" : ""}
            >
              <li>
                <Link to="/" onClick={closeMenu}>Home</Link>
              </li>
              <li>
                <Link to="/products" onClick={closeMenu}>Products</Link>
              </li>
              <li>
                <Link to="/" onClick={closeMenu}>About</Link>
              </li>
              <li>
                <Link to="/" onClick={closeMenu}>Contact</Link>
              </li>
              <li>
                <Link to="/account" onClick={closeMenu}>Account</Link>
              </li>
            </ul>
          </nav>
          
          <div className="nav-icons">
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
            </Link>
            <FontAwesomeIcon
              icon={faBars}
              className="menu-icon"
              onClick={toggleMenu}
              ref={menuButtonRef}
            />
          </div>
        </div>

        {/* Only show header content on homepage */}
        {isHomePage && (
          <div className="header-row">
            <div className="header-col-2">
              <h1>
                Upgrade Your Workout  
                <br />  
                With a New Style!  
              </h1>
              <p>
                Discover sportswear that adapts to your body and amplifies your performance.
                <br />
                Comfort and technology in perfect harmony.
              </p>
              <Link to="/products" className="btn">
                Explore Now ➔
              </Link>
            </div>
            <div className="header-col-2"> 
              <img src="/images/headerImage.png" alt="Featured Product" className="header-image" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;