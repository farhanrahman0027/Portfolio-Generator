import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Palette } from 'lucide-react';

const TemplateSelection: React.FC = () => {
  const navigate = useNavigate();

  const templates = [
    {
      id: 'modern',
      name: 'Modern Template',
      description: 'Clean, minimalist design with vibrant accents',
      preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500&h=300',
      icon: Monitor,
    },
    {
      id: 'classic',
      name: 'Classic Template',
      description: 'Professional, traditional layout with elegant typography',
      preview: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500&h=300',
      icon: Palette,
    },
  ];

  const selectTemplate = (templateId: string) => {
    navigate(`/form?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-12 px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Choose Your <span className="text-emerald-600">Template</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select a professional template that best represents your style and personality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <div
                key={template.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onClick={() => selectTemplate(template.id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-all duration-300" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {template.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-amber-700 transition-all duration-300 transform group-hover:scale-105">
                    Select Template
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500">
            Don't worry, you can always change your template later
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;