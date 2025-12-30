import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT_INFO, ORGANIZATION_NAME } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">{t.footer.aboutUs}</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {t.organizationName} {t.footer.aboutDescription}
            </p>
            <p className="text-emerald-400 text-sm font-semibold italic">
              "सत्य परेशान हो सकता है, पराजित नहीं |"
            </p>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">{t.footer.contactUs}</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-emerald-500 flex-shrink-0" />
                <p>
                  {CONTACT_INFO.address.line1},<br />
                  {CONTACT_INFO.address.district}, {CONTACT_INFO.address.state} - {CONTACT_INFO.address.pincode}
                </p>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-3 text-emerald-500 flex-shrink-0" />
                <p>{CONTACT_INFO.mobile}</p>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-3 text-emerald-500 flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links / Legal */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">{t.footer.legalStatus}</h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>{t.footer.registeredSociety}</li>
              <li>{t.footer.societiesAct}</li>
              <li>{t.footer.regNo}</li>
              <li>{t.footer.ngoId}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {t.organizationName}. {t.footer.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
