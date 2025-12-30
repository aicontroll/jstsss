import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, Shield } from 'lucide-react';
import { ORGANIZATION_NAME } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import FadeIn from '../components/ui/FadeIn';

const Home: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bihar-rivers-map.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="down" duration={0.8}>
            <div className="mb-8 overflow-hidden">
              <p className="text-xl md:text-2xl font-bold text-emerald-300 italic">
                "सत्य परेशान हो सकता है, पराजित नहीं |"
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2} duration={0.8}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              {t.home.heroTitle}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.4} duration={0.8}>
            <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto mb-10">
              {t.organizationName} {t.home.heroDescription}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.6} duration={0.8}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-900 bg-white hover:bg-emerald-50 md:py-4 md:text-lg transition-colors"
              >
                {t.home.contactUs}
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3 border border-emerald-300 text-base font-medium rounded-md text-emerald-100 hover:bg-emerald-800 md:py-4 md:text-lg transition-colors"
              >
                {t.home.learnMore}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section >

      {/* Intro Section */}
      < section className="py-16 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{t.home.ourCommitment}</h2>
              <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Social Welfare Card */}
            <FadeIn delay={0.1} className="h-full">
              <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Users className="text-emerald-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">{t.home.socialWelfareTitle}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t.home.socialWelfareDesc}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Integrity Card */}
            <FadeIn delay={0.2} className="h-full">
              <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Shield className="text-blue-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">{t.home.integrityTitle}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t.home.integrityDesc}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Compassion Card */}
            <FadeIn delay={0.3} className="h-full">
              <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Heart className="text-rose-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-rose-700 transition-colors">{t.home.compassionTitle}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {t.home.compassionDesc}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section >

      {/* Call to Action */}
      < section className="bg-slate-50 border-t border-gray-200 py-16" >
        <FadeIn direction="up">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.home.joinMission}</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              "{t.home.joinDescription}"
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
            >
              {t.home.getInTouch} <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </FadeIn>
      </section >
    </div >
  );
};

export default Home;
