import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Portfolio } from '../types';

interface PortfolioContextType {
  portfolios: Portfolio[];
  addPortfolio: (portfolio: Portfolio) => void;
  updatePortfolio: (id: string, portfolio: Portfolio) => void;
  getPortfolio: (id: string) => Portfolio | undefined;
  filterBySkill: string;
  setFilterBySkill: (skill: string) => void;
  filterByRole: string;
  setFilterByRole: (role: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(() => {
    const saved = localStorage.getItem('portfolios');
    return saved ? JSON.parse(saved) : [];
  });
  const [filterBySkill, setFilterBySkill] = useState('');
  const [filterByRole, setFilterByRole] = useState('');

  const addPortfolio = (portfolio: Portfolio) => {
    const newPortfolios = [...portfolios, portfolio];
    setPortfolios(newPortfolios);
    localStorage.setItem('portfolios', JSON.stringify(newPortfolios));
  };

  const updatePortfolio = (id: string, updatedPortfolio: Portfolio) => {
    const newPortfolios = portfolios.map(p => p.id === id ? updatedPortfolio : p);
    setPortfolios(newPortfolios);
    localStorage.setItem('portfolios', JSON.stringify(newPortfolios));
  };

  const getPortfolio = (id: string) => {
    return portfolios.find(p => p.id === id);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolios,
        addPortfolio,
        updatePortfolio,
        getPortfolio,
        filterBySkill,
        setFilterBySkill,
        filterByRole,
        setFilterByRole,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};