import React from 'react';
import PageContainer from '../components/PageContainer';
import { Image } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import FadeIn from '../components/ui/FadeIn';

const Gallery: React.FC = () => {
   const { language } = useLanguage();
   const t = translations[language];

   return (
      <PageContainer title={t.gallery.title}>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
               <FadeIn key={item} delay={index * 0.1}>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden relative group shadow-sm hover:shadow-md transition-all duration-300">
                     <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                        <Image size={32} />
                     </div>
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 backdrop-blur-[1px]"></div>
                  </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-gray-500 mt-8 italic">{t.gallery.comingSoon}</p>
      </PageContainer>
   );
};

export default Gallery;
