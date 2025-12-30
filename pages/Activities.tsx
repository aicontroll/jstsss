import React from 'react';
import PageContainer from '../components/PageContainer';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Activities: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageContainer title={t.activities.title}>
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Calendar className="text-gray-400" size={40} />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">{t.activities.upcomingEvents}</h3>
        <p className="text-gray-500 max-w-lg mx-auto">
          {t.activities.description}
        </p>
      </div>
    </PageContainer>
  );
};

export default Activities;
