import React from 'react';
import PageContainer from '../components/PageContainer';
import { Target, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const MissionVision: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageContainer title={t.missionVision.title}>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-emerald-100 rounded-full mr-4">
              <Target className="text-emerald-600 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{t.missionVision.ourMission}</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t.missionVision.missionText}
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Globe className="text-blue-600 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{t.missionVision.ourVision}</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t.missionVision.visionText}
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default MissionVision;
