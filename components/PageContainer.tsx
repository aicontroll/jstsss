import React from 'react';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backgroundImage?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, subtitle, children, backgroundImage }) => {
  return (
    <div
      className="bg-gray-50 min-h-screen py-10 relative"
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      {backgroundImage && <div className="absolute inset-0 bg-white/70"></div>}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-emerald-900 border-b-4 border-emerald-500 inline-block pb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-10 border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
