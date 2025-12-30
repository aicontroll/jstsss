import React from 'react';
import PageContainer from '../components/PageContainer';
import { GOVERNING_BODY } from '../constants';
import { User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Governing: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Map designations to translations
  const getDesignation = (designation: string) => {
    const designationMap: { [key: string]: string } = {
      'Secretary': t.governing.secretary,
      'Chairman': t.governing.chairman,
      'Treasurer': t.governing.treasurer,
    };
    return designationMap[designation] || designation;
  };

  return (
    <PageContainer title={t.governing.title}>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        {t.governing.description}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GOVERNING_BODY.map((member, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <User size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wide">
              {getDesignation(member.designation)}
            </span>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default Governing;
