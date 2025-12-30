import React from 'react';
import PageContainer from '../components/PageContainer';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import FadeIn from '../components/ui/FadeIn';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageContainer title={t.contact.title}>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <FadeIn direction="right" delay={0.2}>
          <div className="space-y-8 h-full">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                {t.contact.registeredOffice}
              </h3>
              <div className="flex items-start">
                <MapPin className="text-emerald-600 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-600 leading-relaxed">
                  <span className="font-medium text-gray-900">JATASHANKAR THAKUR SMARITI SEVA SANSTHAN</span><br />
                  {CONTACT_INFO.address.line1}<br />
                  {t.contact.district} {CONTACT_INFO.address.district},<br />
                  {CONTACT_INFO.address.state} – {CONTACT_INFO.address.pincode}, {CONTACT_INFO.address.country}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                {t.contact.getInTouch}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <Phone className="text-emerald-600 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-600 font-medium">{t.contact.mobile}</span>
                  <span className="ml-2 text-gray-800 group-hover:text-emerald-700 transition-colors">{CONTACT_INFO.mobile}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">{t.contact.telephone}</span>
                  <span className="ml-2 text-gray-500 italic">{t.contact.notAvailable}</span>
                </div>
                <div className="flex items-center group">
                  <Mail className="text-emerald-600 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-600 font-medium">{t.contact.email}</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="ml-2 text-emerald-700 hover:underline hover:text-emerald-600 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Message Box */}
        <FadeIn direction="left" delay={0.4}>
          <div className="bg-emerald-50/80 backdrop-blur-sm p-8 rounded-xl border border-emerald-100 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <h3 className="text-xl font-bold text-emerald-900 mb-4">{t.contact.noteTitle}</h3>
            <blockquote className="text-emerald-800 text-lg italic leading-relaxed border-l-4 border-emerald-500 pl-4">
              "{t.contact.noteMessage}"
            </blockquote>
            <div className="mt-8">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="block w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-md shadow-sm hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
              >
                {t.contact.sendEmail}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageContainer>
  );
};

export default Contact;
