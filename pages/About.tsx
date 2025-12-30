import React from 'react';
import PageContainer from '../components/PageContainer';
import { ORGANIZATION_NAME } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageContainer title={t.about.title}>
      <div className="prose prose-emerald max-w-none text-gray-700">
        <p className="text-lg leading-relaxed mb-6">
          <strong className="text-emerald-800">{t.organizationName}</strong> {t.about.established}
          <span className="font-semibold"> {t.about.establishedDate}</span> {t.about.registeredAs}
        </p>

        <p className="mb-6">
          {t.about.commitment}
        </p>

        <p>
          {t.about.founded}
        </p>

        <div className="mt-8 p-6 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
          <h4 className="text-emerald-900 font-bold mb-2">{t.about.historyTitle}</h4>
          <p className="text-sm text-emerald-800">
            {t.about.historyDesc}
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default About;
