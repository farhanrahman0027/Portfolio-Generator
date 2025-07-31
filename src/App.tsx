import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Header from './components/Header';
import TemplateSelection from './components/TemplateSelection';
import PortfolioForm from './components/PortfolioForm';
import ProfessionalsList from './components/ProfessionalsList';
import PortfolioView from './components/PortfolioView';
import EditPortfolio from './components/EditPortfolio';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<TemplateSelection />} />
            <Route path="/form" element={<PortfolioForm />} />
            <Route path="/professionals" element={<ProfessionalsList />} />
            <Route path="/portfolio/:id" element={<PortfolioView />} />
            <Route path="/edit/:id" element={<EditPortfolio />} />
          </Routes>
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;