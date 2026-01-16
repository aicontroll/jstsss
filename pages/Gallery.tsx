import React, { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import FadeIn from '../components/ui/FadeIn';
import { supabase } from '../lib/supabase';

interface GalleryImage {
   id: string;
   title: string | null;
   image_url: string;
   created_at: string;
}

const Gallery: React.FC = () => {
   const { language } = useLanguage();
   const t = translations[language];
   const [images, setImages] = useState<GalleryImage[]>([]);
   const [loading, setLoading] = useState(true);
   const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

   useEffect(() => {
      const fetchImages = async () => {
         const { data, error } = await supabase
            .from('gallery_images')
            .select('*')
            .order('created_at', { ascending: false });

         if (data) setImages(data);
         setLoading(false);
      };

      fetchImages();
   }, []);

   // Close lightbox on escape key
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Escape') setSelectedImage(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, []);

   return (
      <PageContainer title={t.gallery.title}>
         {loading ? (
            <div className="flex justify-center p-12">
               <Loader2 className="animate-spin text-emerald-600" size={32} />
            </div>
         ) : images.length > 0 ? (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                     <FadeIn key={img.id} delay={index * 0.1}>
                        <div
                           className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden relative group shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                           onClick={() => setSelectedImage(img)}
                        >
                           <img
                              src={img.image_url}
                              alt={img.title || 'Gallery Image'}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                           />
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                              {img.title && (
                                 <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <p className="font-medium text-sm">{img.title}</p>
                                 </div>
                              )}
                           </div>
                        </div>
                     </FadeIn>
                  ))}
               </div>

               {/* Lightbox Modal */}
               {selectedImage && (
                  <div
                     className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-200"
                     onClick={() => setSelectedImage(null)}
                  >
                     <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                     </button>

                     <div
                        className="max-w-7xl max-h-screen w-full flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent close when clicking image area
                     >
                        <img
                           src={selectedImage.image_url}
                           alt={selectedImage.title || 'Full screen view'}
                           className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                        />
                        {selectedImage.title && (
                           <p className="mt-4 text-white text-lg font-medium tracking-wide">
                              {selectedImage.title}
                           </p>
                        )}
                     </div>
                  </div>
               )}
            </>
         ) : (
            <div className="text-center py-12">
               <p className="text-gray-500 italic mb-2">{t.gallery.comingSoon}</p>
               <p className="text-sm text-gray-400">Admin: Upload images in the dashboard to see them here.</p>
            </div>
         )}
      </PageContainer>
   );
};

export default Gallery;
