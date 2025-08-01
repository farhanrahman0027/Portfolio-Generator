import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Globe, Plus, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Portfolio } from '../types';

const EditPortfolio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { portfolios, updatePortfolio } = usePortfolio();
  
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    if (id) {
      const existingPortfolio = portfolios.find(p => p.id === id);
      if (existingPortfolio) {
        setPortfolio(existingPortfolio);
      } else {
        navigate('/professionals');
      }
    }
  }, [id, portfolios, navigate]);

  const sections = [
    'Hero Section',
    'About Me',
    'Skills',
    'Services',
    'Portfolio',
    'Testimonials',
    'Blog',
    'Contact'
  ];

  const handleInputChange = (section: keyof Portfolio, field: string, value: any) => {
    if (!portfolio) return;
    
    setPortfolio(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  const handleArrayChange = (section: keyof Portfolio, index: number, field: string, value: any) => {
    if (!portfolio) return;
    
    setPortfolio(prev => {
      if (!prev) return prev;
      const sectionData = prev[section] as any[];
      const newArray = [...sectionData];
      newArray[index] = { ...newArray[index], [field]: value };
      
      return {
        ...prev,
        [section]: newArray
      };
    });
  };

  const addArrayItem = (section: keyof Portfolio, newItem: any) => {
    if (!portfolio) return;
    
    setPortfolio(prev => {
      if (!prev) return prev;
      const sectionData = prev[section] as any[];
      
      return {
        ...prev,
        [section]: [...sectionData, newItem]
      };
    });
  };

  const removeArrayItem = (section: keyof Portfolio, index: number) => {
    if (!portfolio) return;
    
    setPortfolio(prev => {
      if (!prev) return prev;
      const sectionData = prev[section] as any[];
      
      return {
        ...prev,
        [section]: sectionData.filter((_, i) => i !== index)
      };
    });
  };

  const handleSave = () => {
    if (portfolio) {
      updatePortfolio(portfolio);
      navigate('/professionals');
    }
  };

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const renderHeroSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Hero Section</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
          <input
            type="text"
            value={portfolio.hero.name}
            onChange={(e) => handleInputChange('hero', 'name', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
          <input
            type="text"
            value={portfolio.hero.title}
            onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
        <textarea
          value={portfolio.hero.tagline}
          onChange={(e) => handleInputChange('hero', 'tagline', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Profile Image URL</label>
        <input
          type="url"
          value={portfolio.hero.profileImage}
          onChange={(e) => handleInputChange('hero', 'profileImage', e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">About Me</h3>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
        <textarea
          value={portfolio.about.bio}
          onChange={(e) => handleInputChange('about', 'bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            value={portfolio.about.email}
            onChange={(e) => handleInputChange('about', 'email', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
          <input
            type="tel"
            value={portfolio.about.phone}
            onChange={(e) => handleInputChange('about', 'phone', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
          <input
            type="text"
            value={portfolio.about.location}
            onChange={(e) => handleInputChange('about', 'location', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
          <input
            type="url"
            value={portfolio.about.website}
            onChange={(e) => handleInputChange('about', 'website', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSkillsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {portfolio.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {skill}
            <button
              onClick={() => removeArrayItem('skills', index)}
              className="text-emerald-600 hover:text-emerald-800"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a skill"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              addArrayItem('skills', e.currentTarget.value.trim());
              e.currentTarget.value = '';
            }
          }}
          className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 0: return renderHeroSection();
      case 1: return renderAboutSection();
      case 2: return renderSkillsSection();
      default: return renderHeroSection();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/professionals')}
              className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Edit Portfolio</h1>
              <p className="text-slate-600">Update your professional information</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-700 hover:to-amber-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-semibold text-slate-800 mb-4">Sections</h3>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentSection === index
                        ? 'bg-emerald-100 text-emerald-700 font-medium'
                        : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPortfolio;