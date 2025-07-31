import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { Eye, Filter, Search, MapPin, Mail, Plus } from 'lucide-react';

const ProfessionalsList: React.FC = () => {
  const { portfolios, filterBySkill, setFilterBySkill, filterByRole, setFilterByRole } = usePortfolio();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique skills and roles for filters
  const allSkills = [...new Set(portfolios.flatMap(p => p.skills))];
  const allRoles = [...new Set(portfolios.map(p => p.hero.title))];

  // Filter portfolios
  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesSearch = portfolio.hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portfolio.hero.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !filterBySkill || portfolio.skills.includes(filterBySkill);
    const matchesRole = !filterByRole || portfolio.hero.title === filterByRole;
    
    return matchesSearch && matchesSkill && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Professionals</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover talented professionals and their amazing work
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or role..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Skill</label>
              <select
                value={filterBySkill}
                onChange={(e) => setFilterBySkill(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
              <select
                value={filterByRole}
                onChange={(e) => setFilterByRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Roles</option>
                {allRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
          
          {(filterBySkill || filterByRole || searchTerm) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setFilterBySkill('');
                  setFilterByRole('');
                  setSearchTerm('');
                }}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPortfolios.length} of {portfolios.length} professionals
          </p>
        </div>

        {/* Professionals Grid */}
        {filteredPortfolios.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No professionals found</h3>
              <p className="text-gray-600 mb-6">
                {portfolios.length === 0 
                  ? "No portfolios created yet. Be the first to create one!"
                  : "Try adjusting your filters or search terms."}
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Create Portfolio
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
              >
                {/* Profile Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={portfolio.hero.profileImage}
                    alt={portfolio.hero.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{portfolio.hero.name}</h3>
                    <p className="text-sm opacity-90">{portfolio.hero.title}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {portfolio.about.bio}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    {portfolio.about.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{portfolio.about.email}</span>
                      </div>
                    )}
                    {portfolio.about.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{portfolio.about.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-1">
                      {portfolio.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {portfolio.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{portfolio.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Portfolio Button */}
                  <button
                    onClick={() => navigate(`/portfolio/${portfolio.id}`)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-4 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all transform group-hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    View Portfolio
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${portfolio.id}`);
                    }}
                    className="w-full mt-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalsList;