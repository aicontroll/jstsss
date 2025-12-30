import React from 'react';
import PageContainer from '../components/PageContainer';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Operational: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageContainer title={t.operational.title} backgroundImage="/bihar-rivers-map.png">
      <div className="flex flex-col md:flex-row items-center gap-8">

        <div className="flex-1">
          <div className="prose prose-emerald">
            <p className="text-lg text-gray-700">
              {t.operational.description}
            </p>
            <ul className="list-none pl-0 space-y-4 mt-6">
              <li className="flex items-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <MapPin className="text-emerald-600 mr-4" />
                <div>
                  <span className="block text-xs font-bold text-emerald-500 uppercase tracking-wide">{t.operational.operationalState}</span>
                  <span className="text-xl font-bold text-gray-800">{t.operational.bihar}</span>
                </div>
              </li>
              <li className="flex items-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <MapPin className="text-emerald-600 mr-4" />
                <div>
                  <span className="block text-xs font-bold text-emerald-500 uppercase tracking-wide">{t.operational.operationalDistrict}</span>
                  <span className="text-xl font-bold text-gray-800">{t.operational.begusarai}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>


        {/* Map */}
        <div className="flex-1 w-full flex justify-center">
          <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden border-4 border-white shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114682.89999999999!2d86.0!3d25.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f29937c52d4f05%3A0x831a0e05f6bc2e0!2sBegusarai%2C%20Bihar!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              title="Begusarai, Bihar Location"
            ></iframe>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Operational;
