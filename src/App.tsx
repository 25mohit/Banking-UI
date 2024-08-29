import React from 'react';
import './App.css';
import './Style.css';
import Navbar from './components/Utils/Navbar/Navbar';
import Section from './components/HOC/Section/Section';
import Footer from './components/Utils/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Section />
      <Footer />
    </div>
  );
}

export default App;
