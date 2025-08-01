import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import { ArrowLeft, Edit } from 'lucide-react';

const PortfolioView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPortfolio } = usePortfolio();

  // 🔄 Return early if ID is missing
  if (!id) return <PortfolioNotFound />;

  const portfolio = getPortfolio(id);

  // ❌ Return early if portfolio not found
  if (!portfolio) return <PortfolioNotFound showMessage />;

  const TemplateComponent =
    portfolio.template === 'modern' ? ModernTemplate : ClassicTemplate;

  return (
    <div className="relative">
      {/* ✨ Floating Edit Button */}
      <div className="fixed top-20 right-6 z-40">
        <button
          onClick={() => navigate(`/edit/${portfolio.id}`)}
          title="Edit Portfolio"
          className="group bg-primary-600/90 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all backdrop-blur-md"
        >
          <Edit className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>

      {/* 🎨 Render the template */}
      <TemplateComponent portfolio={portfolio} />
    </div>
  );
};

export default PortfolioView;

const PortfolioNotFound: React.FC<{ showMessage?: boolean }> = ({ showMessage = false }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Portfolio Not Found</h1>
        {showMessage && (
          <p className="text-gray-600 mb-6">
            The portfolio you're looking for doesn't exist or has been removed.
          </p>
        )}
        <button
          onClick={() => navigate('/professionals')}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-md hover:bg-primary-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Professionals
        </button>
      </div>
    </div>
  );
};
