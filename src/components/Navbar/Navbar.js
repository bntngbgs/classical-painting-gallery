import './Navbar.scss';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="nav">
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/gallery'}>Gallery</NavLink>
      <img src={logo} alt="app-logo" />
      <NavLink to={'/search'}>Search</NavLink>
      <NavLink to={'about'}>About</NavLink>
    </div>
  );
};

export default Navbar;
