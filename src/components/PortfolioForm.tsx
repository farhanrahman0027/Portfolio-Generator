import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { FormData } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { User, Mail, Phone, MapPin, Code, Briefcase, Camera, MessageSquare, FileText, Send, Plus, Trash2 } from 'lucide-react';

const PortfolioForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const template = searchParams.get('template') as 'modern' | 'classic' || 'modern';
  const navigate = useNavigate();
  const { addPortfolio } = usePortfolio();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    template,
    hero: {
      name: '',
      title: '',
      tagline: '',
      profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    about: {
      bio: '',
      email: '',
      phone: '',
      location: '',
      socials: {},
    },
    skills: [],
    services: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    portfolio: [
      { title: '', image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600', description: '' },
      { title: '', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600', description: '' },
      { title: '', image: 'https://images.pexels.com/photos/374820/pexels-photo-374820.jpeg?auto=compress&cs=tinysrgb&w=600', description: '' },
    ],
    testimonials: [
      { name: '', role: '', company: '', quote: '', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
    blog: {
      title: '',
      summary: '',
    },
    contact: {
      message: '',
      email: '',
      phone: '',
    },
  });

  const steps = [
    { title: 'Hero Section', icon: User },
    { title: 'About Me', icon: Mail },
    { title: 'Skills', icon: Code },
    { title: 'Services', icon: Briefcase },
    { title: 'Portfolio', icon: Camera },
    { title: 'Testimonials', icon: MessageSquare },
    { title: 'Blog', icon: FileText },
    { title: 'Contact', icon: Send },
  ];

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      updateFormData('skills', [...formData.skills, skill.trim()]);
    }
  };

  const removeSkill = (index: number) => {
    updateFormData('skills', formData.skills.filter((_, i) => i !== index));
  };

  const addTestimonial = () => {
    updateFormData('testimonials', [
      ...formData.testimonials,
      { name: '', role: '', company: '', quote: '', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ]);
  };

  const removeTestimonial = (index: number) => {
    if (formData.testimonials.length > 1) {
      updateFormData('testimonials', formData.testimonials.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const portfolio = {
      ...formData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    
    addPortfolio(portfolio);
    navigate('/professionals');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Hero Section
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hero Section</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.hero.name}
                  onChange={(e) => updateFormData('hero', { ...formData.hero, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title *</label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) => updateFormData('hero', { ...formData.hero, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Senior Software Developer"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
              <input
                type="text"
                value={formData.hero.tagline}
                onChange={(e) => updateFormData('hero', { ...formData.hero, tagline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Building amazing digital experiences"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
              <input
                type="url"
                value={formData.hero.profileImage}
                onChange={(e) => updateFormData('hero', { ...formData.hero, profileImage: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );

      case 1: // About Me
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
              <textarea
                value={formData.about.bio}
                onChange={(e) => updateFormData('about', { ...formData.about, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us about yourself..."
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.about.email}
                  onChange={(e) => updateFormData('about', { ...formData.about, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.about.phone}
                  onChange={(e) => updateFormData('about', { ...formData.about, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.about.location}
                onChange={(e) => updateFormData('about', { ...formData.about, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="New York, NY"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={formData.about.socials.linkedin || ''}
                  onChange={(e) => updateFormData('about', { 
                    ...formData.about, 
                    socials: { ...formData.about.socials, linkedin: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                <input
                  type="url"
                  value={formData.about.socials.github || ''}
                  onChange={(e) => updateFormData('about', { 
                    ...formData.about, 
                    socials: { ...formData.about.socials, github: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://github.com/johndoe"
                />
              </div>
            </div>
          </div>
        );

      case 2: // Skills
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Add Skill</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Type a skill and press Enter"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            
            {formData.skills.length === 0 && (
              <p className="text-gray-500 text-center py-8">No skills added yet. Add some skills to showcase your expertise!</p>
            )}
          </div>
        );

      case 3: // Services
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services</h2>
            
            {formData.services.map((service, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Service {index + 1}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[index].title = e.target.value;
                        updateFormData('services', newServices);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Web Development"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={service.description}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[index].description = e.target.value;
                        updateFormData('services', newServices);
                      }}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Describe your service..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 4: // Portfolio
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Projects</h2>
            
            {formData.portfolio.map((project, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Project {index + 1}</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...formData.portfolio];
                        newProjects[index].title = e.target.value;
                        updateFormData('portfolio', newProjects);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="E-commerce Platform"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={project.image}
                      onChange={(e) => {
                        const newProjects = [...formData.portfolio];
                        newProjects[index].image = e.target.value;
                        updateFormData('portfolio', newProjects);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/project-image.jpg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...formData.portfolio];
                        newProjects[index].description = e.target.value;
                        updateFormData('portfolio', newProjects);
                      }}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Describe your project..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 5: // Testimonials
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
              <button
                onClick={addTestimonial}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Testimonial
              </button>
            </div>
            
            {formData.testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Testimonial {index + 1}</h3>
                  {formData.testimonials.length > 1 && (
                    <button
                      onClick={() => removeTestimonial(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => {
                        const newTestimonials = [...formData.testimonials];
                        newTestimonials[index].name = e.target.value;
                        updateFormData('testimonials', newTestimonials);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Client Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) => {
                        const newTestimonials = [...formData.testimonials];
                        newTestimonials[index].role = e.target.value;
                        updateFormData('testimonials', newTestimonials);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="CEO"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={testimonial.company}
                      onChange={(e) => {
                        const newTestimonials = [...formData.testimonials];
                        newTestimonials[index].company = e.target.value;
                        updateFormData('testimonials', newTestimonials);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
                    <input
                      type="url"
                      value={testimonial.avatar}
                      onChange={(e) => {
                        const newTestimonials = [...formData.testimonials];
                        newTestimonials[index].avatar = e.target.value;
                        updateFormData('testimonials', newTestimonials);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quote *</label>
                  <textarea
                    value={testimonial.quote}
                    onChange={(e) => {
                      const newTestimonials = [...formData.testimonials];
                      newTestimonials[index].quote = e.target.value;
                      updateFormData('testimonials', newTestimonials);
                    }}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="What did they say about your work?"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 6: // Blog
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Blog (Optional)</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
              <input
                type="text"
                value={formData.blog?.title || ''}
                onChange={(e) => updateFormData('blog', { ...formData.blog, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="My Tech Blog"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
              <textarea
                value={formData.blog?.summary || ''}
                onChange={(e) => updateFormData('blog', { ...formData.blog, summary: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Brief description of your blog content..."
              />
            </div>
          </div>
        );

      case 7: // Contact
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Message</label>
              <textarea
                value={formData.contact.message}
                onChange={(e) => updateFormData('contact', { ...formData.contact, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Let's work together to bring your ideas to life!"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => updateFormData('contact', { ...formData.contact, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="contact@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) => updateFormData('contact', { ...formData.contact, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Portfolio</h1>
            <p className="text-gray-500">Fill out the form to generate your professional portfolio</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index <= currentStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className="w-12 h-0.5 ml-2 "
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105"
              >
                Create Portfolio
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;