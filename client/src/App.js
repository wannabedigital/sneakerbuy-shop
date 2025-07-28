import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Home from './components/Home';
import Catalog from './components/Catalog';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    )
  }
}

export default App;
