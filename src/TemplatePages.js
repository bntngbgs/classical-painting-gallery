import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './layout.scss';
import { Outlet } from 'react-router-dom';

const TemplatePages = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default TemplatePages;
