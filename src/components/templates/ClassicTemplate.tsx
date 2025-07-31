import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Star } from 'lucide-react';
import { Portfolio } from '../../types';

interface ClassicTemplateProps {
  portfolio: Portfolio;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ portfolio }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                {portfolio.hero.name}
              </h1>
              <h2 className="text-2xl md:text-3xl text-emerald-600 mb-8 font-light">
                {portfolio.hero.title}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {portfolio.hero.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${portfolio.about.email}`}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Get In Touch</span>
                </a>
                <a
                  href="#portfolio"
                  className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors text-center"
                >
                  View My Work
                </a>
              </div>
            </div>
            <div className="text-center">
              <img
                src={portfolio.hero.profileImage}
                alt={portfolio.hero.name}
                className="w-80 h-80 rounded-full mx-auto shadow-2xl border-8 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                {portfolio.about.bio}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">{portfolio.about.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">{portfolio.about.phone}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <span className="text-slate-700">{portfolio.about.location}</span>
                  </div>
                  {portfolio.about.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-emerald-600" />
                      <a href={portfolio.about.website} className="text-emerald-600 hover:text-emerald-700 transition-colors">
                        {portfolio.about.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Skills</h3>
                <div className="space-y-3">
                  {portfolio.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-slate-700">{skill}</span>
                      <div className="w-16 h-2 bg-slate-200 rounded-full">
                        <div className="w-full h-full bg-emerald-600 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Services</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.services.map((service, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Portfolio</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.portfolio.map((project, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-emerald-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Testimonials</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-8 relative"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="text-emerald-600 font-semibold">— {testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {portfolio.blog.title && (
        <section className="py-20 px-4 bg-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">{portfolio.blog.title}</h2>
            <p className="text-xl text-slate-600 leading-relaxed">{portfolio.blog.summary}</p>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 px-4 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Work Together</h2>
          <p className="text-xl text-emerald-100 mb-12 leading-relaxed">{portfolio.contact.message}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${portfolio.contact.email}`}
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Send Email</span>
            </a>
            <a
              href={`tel:${portfolio.contact.phone}`}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 {portfolio.hero.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ClassicTemplate;