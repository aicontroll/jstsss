import React from 'react';
import PageContainer from '../components/PageContainer';
import { LEGAL_DETAILS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Legal: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Map legal detail labels to translations
  const getLegalLabel = (label: string) => {
    const labelMap: { [key: string]: string } = {
      'NGO Name': t.legal.ngoName,
      'NGO ID': t.legal.ngoId,
      'NGO Type': t.legal.ngoType,
      'Registration Number': t.legal.registrationNumber,
      'Act Name': t.legal.actName,
      'Date of Registration': t.legal.dateOfRegistration,
      'Registering Authority': t.legal.registeringAuthority,
      'Register City': t.legal.registerCity,
      'Register State': t.legal.registerState,
    };
    return labelMap[label] || label;
  };

  return (
    <PageContainer title={t.legal.title} subtitle={t.legal.subtitle}>
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.legal.parameter}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t.legal.details}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {LEGAL_DETAILS.map((detail, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getLegalLabel(detail.label)}
                </td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">
                  {detail.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 italic">
          {t.legal.verifyNote}
        </p>
      </div>
    </PageContainer>
  );
};

export default Legal;
