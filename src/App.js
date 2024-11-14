import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Gallery from './components/Gallery/Gallery';
import Search from './components/Search/Search';
import About from './components/About/About';
import TemplatePages from './TemplatePages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TemplatePages />}>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
