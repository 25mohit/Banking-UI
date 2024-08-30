import './App.css';
import './Style.css';
import './Responsive.css';
import Navbar from './components/Utils/Navbar/Navbar';
import Section from './components/HOC/Section/Section';
import Footer from './components/Utils/Footer/Footer';
import LoanCalculation from './components/Utils/LoanCalculation/LoanCalculation';

function App() {
  return (
    <div className="App">

      <Navbar />
      {/* Home Page - STARTS -*/}
      <Section>
        <LoanCalculation />
      </Section>
      {/* Home Page - ENDS -*/}
      <Footer />
    </div>
  );
}

export default App;
