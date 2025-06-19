import PageTemplate from '../components/PageTemplate';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import SpotlightCard from '../blocks/Components/SpotlightCard/SpotlightCard';
import { useEffect } from 'react';

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <PageTemplate title="Kontakt" subtitle="So erreichst du uns">
      <div className="container py-4">
        <section className="text-center mb-5">
          <p className="lead">
            Wir freuen uns auf deine Nachricht – egal ob Feedback, Musikwunsch oder Bewerbung!
          </p>
        </section>
        <AnimatedContent distance={100} direction="vertical" reverse={false} duration={1.5} ease="power3.out" initialOpacity={0} animateOpacity scale={1} threshold={0.1} delay={0.2}>
          <section className="mb-5">
            <div className="row g-4 justify-content-center">
              <div className="col-12 col-md-6">
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 20, 255, 0.5)">
                  <div className="card-body text-center">
                    <i className="bi bi-envelope-paper-fill display-5 mb-3 d-block fs-1"></i>
                    <h5 className="card-title fw-bold mb-2">E-Mail</h5>
                    <p className="card-text fs-5 mb-0">
                      <a href="mailto:kontakt@nachtschicht.de" style={{ color: '#e0e6f0', textDecoration: 'underline' }}>
                        kontakt@nachtschicht.de
                      </a>
                    </p>
                  </div>
                </SpotlightCard>
              </div>
              <div className="col-12 col-md-6">
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 20, 255, 0.5)">
                  <div className="card-body text-center">
                    <i className="bi bi-discord display-5 mb-3 d-block fs-1"></i>
                    <h5 className="card-title fw-bold mb-2">Discord</h5>
                    <p className="card-text fs-5 mb-0">
                      <a href="https://discord.gg/nachtschicht" target="_blank" rel="noopener noreferrer" style={{ color: '#e0e6f0', textDecoration: 'underline' }}>
                        Zum Discord-Server
                      </a>
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </section>
        </AnimatedContent>
      </div>
    </PageTemplate>
  );
}

export default Contact;