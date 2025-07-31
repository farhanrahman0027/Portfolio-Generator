import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Star } from 'lucide-react';
import { Portfolio } from '../../types';

interface ModernTemplateProps {
  portfolio: Portfolio;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ portfolio }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-amber-600/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src={portfolio.hero.profileImage}
              alt={portfolio.hero.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white/20 shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {portfolio.hero.name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-emerald-400 mb-8 font-light">
            {portfolio.hero.title}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {portfolio.hero.tagline}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">About Me</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {portfolio.about.bio}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>{portfolio.about.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>{portfolio.about.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>{portfolio.about.location}</span>
                </div>
                {portfolio.about.website && (
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <a href={portfolio.about.website} className="hover:text-emerald-400 transition-colors">
                      {portfolio.about.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-600/20 to-amber-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {portfolio.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm border border-emerald-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.portfolio.map((project, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="text-emerald-400 font-semibold">{testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {portfolio.blog.title && (
        <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">{portfolio.blog.title}</h2>
            <p className="text-xl text-slate-300 leading-relaxed">{portfolio.blog.summary}</p>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">{portfolio.contact.message}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${portfolio.contact.email}`}
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-amber-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Email Me</span>
            </a>
            <a
              href={`tel:${portfolio.contact.phone}`}
              className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2 border border-white/20"
            >
              <Phone className="w-5 h-5" />
              <span>Call Me</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 {portfolio.hero.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ModernTemplate;