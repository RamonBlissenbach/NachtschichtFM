import React from 'react';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  children: React.ReactNode;
}

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80';

const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  subtitle,
  imageUrl = DEFAULT_IMAGE,
  children,
}) => (
  <div
    className="min-vh-100 w-100 bg-dark text-light overflow-hidden flex-column"
    data-bs-theme="dark"
    style={{ minHeight: '100vh', overflowX: 'hidden' }}
  >
    {/* Hero Section */}
    <div className="position-relative w-100" style={{ height: 340 }}>
      <img
        src={imageUrl}
        alt={title}
        className="w-100 h-100"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          filter: 'brightness(0.5)',
        }}
      />
      <div
        className="position-relative d-flex flex-column justify-content-center align-items-center h-100"
        style={{ zIndex: 2 }}
      >
        <div>
          <h1 className="display-4 fw-bold text-white text-center mb-2">{title}</h1>
          {subtitle && (
            <p className="lead text-white-50 text-center mb-0">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
    {/* Content Section */}
 <main className="flex-grow-1 d-flex justify-content-center align-items-start py-5">
      <div
        className="card bg-dark bg-opacity-75 text-light shadow-lg w-100 overflow-hidden mx-3"
        style={{ maxWidth: 900 }}
      >
        <div className="card-body">
          {children}
        </div>
      </div>
    </main>
  </div>
);

export default PageTemplate;