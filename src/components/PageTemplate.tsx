import React from 'react';
import ShinyText from '../blocks/TextAnimations/ShinyText/ShinyText';
import Particles from '../blocks/Backgrounds/Particles/Particles';
import FadeContent from '../blocks/Animations/FadeContent/FadeContent';

import Footer from './Footer';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  subtitle,
  children,
}) => (
  <div
    className="min-vh-100 w-100 text-light overflow-hidden flex-column"
    data-bs-theme="dark"
    style={{
      minHeight: '100vh',
      overflowX: 'hidden',
      backgroundColor: '#000612',
      position: 'relative',
    }}
  >
    {/* Particles Background */}
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Particles
        particleColors={['#585ad0', '#585fff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />
    </div>

    {/* Hero Section */}
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div className="position-relative w-100" style={{ height: 340, backgroundColor: 'transparent', zIndex: 2 }}>
        {/* Content on top of particles */}
        <div
          className="position-relative d-flex flex-column justify-content-center align-items-center h-100 mt-5"
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <ShinyText
              text={title}
              disabled={false}
              speed={3}
              className="custom-class h1 display-4 fw-bold text-center mb-2"
            />
            {subtitle && (
              <p className="lead text-white-50 text-center mb-0">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </FadeContent>

    {/* Content Section */}
    <main className="flex-grow-1 d-flex justify-content-center align-items-start" style={{ position: 'relative', zIndex: 3 }}>
      <div
        className="card text-light w-100 overflow-hidden mx-3"
        style={{ maxWidth: 900, border: 'none', borderRadius: 20, backgroundColor: 'transparent' }}
      >
        <div className="card-body">{children}</div>
      </div>
    </main>
  <Footer />
  </div>
);

export default PageTemplate;