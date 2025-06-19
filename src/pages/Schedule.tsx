import PageTemplate from '../components/PageTemplate';
import SpotlightCard from '../blocks/Components/SpotlightCard/SpotlightCard';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import CountUp from '../blocks/TextAnimations/CountUp/CountUp';
import { useEffect } from 'react';

function countShowsToday(schedule: any[]) {
  const today = ['sun','mon','tue','wed','thu','fri','sat'][new Date().getDay()];
  return schedule.filter(item => item.day === today).length;
}

function Schedule({ listeners, songs, schedule }: { listeners: number, songs: any[], schedule: any[] }) {
  const showsToday = countShowsToday(schedule);
  const songsPlayed = songs.length > 0 ? songs.length : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <PageTemplate title="Programm" subtitle="Aktuelle Sendungen und Highlights">
      <div className="container py-4">
        {/* Stat Cards */}
        <AnimatedContent distance={100} direction="vertical" reverse={false} duration={1.5} ease="power3.out" initialOpacity={0} animateOpacity scale={1} threshold={0.1} delay={0.2}>
          <section className="mb-5">
            <div className="row g-4">
              <div className="col-12 col-md-4">
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 20, 255, 0.5)">
                  <div className="card-body">
                    <i className="bi bi-people-fill display-5 mb-2 d-block fs-1"></i>
                    <h5 className="card-title fw-bold mb-1">Hörer aktuell</h5>
                    <p className="card-text fs-5 mb-0" style={{ color: '#888' }}>
                      <CountUp from={0} to={listeners} separator="," direction="up" duration={1} className="count-up-text" />
                    </p>
                  </div>
                </SpotlightCard>
              </div>
              <div className="col-12 col-md-4">
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 20, 255, 0.5)">
                  <div className="card-body">
                    <i className="bi bi-music-note-beamed display-5 mb-2 d-block fs-1"></i>
                    <h5 className="card-title fw-bold mb-1">Songs gespielt</h5>
                    <p className="card-text fs-5 mb-0" style={{ color: '#888' }}>
                      <CountUp from={0} to={songsPlayed} separator="," direction="up" duration={1} className="count-up-text" />
                    </p>
                  </div>
                </SpotlightCard>
              </div>
              <div className="col-12 col-md-4">
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 20, 255, 0.5)">
                  <div className="card-body">
                    <i className="bi bi-broadcast-pin display-5 mb-2 d-block fs-1"></i>
                    <h5 className="card-title fw-bold mb-1">Sendungen heute</h5>
                    <p className="card-text fs-5 mb-0" style={{ color: '#888' }}>
                      <CountUp from={0} to={showsToday} separator="," direction="up" duration={1} className="count-up-text" />
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </section>
        </AnimatedContent>

        {/* Schedule Table */}
        <style>
            {`
            .liquid-glass-table {
              background: rgba(24, 28, 38, 0.65) !important;
              border-radius: 18px !important;
              backdrop-filter: blur(2px) !important;
              -webkit-backdrop-filter: blur(12px) !important;
              border: 1px solid rgba(255, 255, 255, 0.10) !important;
              overflow: hidden;
            }
            .liquid-glass-table th,
            .liquid-glass-table td {
              background: rgba(36, 40, 54, 0.18) !important;
              border: none !important;
              color: #e0e6f0 !important;
              vertical-align: middle !important;
              font-weight: 500;
              text-shadow: 0 1px 2px rgba(0,0,0,0.18);
            }
            .liquid-glass-table thead th {
              background: rgba(36,40,54,0.32) !important;
              color: #fff !important;
              border-bottom: 1.5px solid rgba(255,255,255,0.07) !important;
              font-size: 1.07rem;
              letter-spacing: 0.01em;
            }
            .liquid-glass-table tbody tr {
              transition: background 0.2s;
            }
            .liquid-glass-table tbody tr:hover {
              background: rgba(60, 70, 100, 0.22) !important;
            }
            .liquid-glass-table tbody td {
              border-top: 1px solid rgba(255,255,255,0.04) !important;
            }
            .liquid-glass-table tr:last-child td {
              border-bottom: none !important;
            }

            /* Striped rows */
            .liquid-glass-table.striped tbody tr:nth-child(odd) {
              background: rgba(36, 40, 54, 0.28) !important;
            }
            .liquid-glass-table.striped tbody tr:nth-child(even) {
              background: rgba(36, 40, 54, 0.18) !important;
            }
            `}
        </style>

        <section className="mb-5">
          <h3 className="mb-3">Sendeplan</h3>
          <div className="table-responsive">
            <table className="table liquid-glass-table align-middle">
              <thead>
          <tr>
            <th>#</th>
            <th>Sendung</th>
            <th>Beschreibung</th>
            <th>Tag</th>
            <th>Start</th>
            <th>Ende</th>
          </tr>
              </thead>
              <tbody>
          {schedule.length === 0 && (
            <tr>
              <td colSpan={6}>Keine Daten</td>
            </tr>
          )}
          {schedule.map((item, idx) => (
            <tr key={item.id || idx}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.day || '-'}</td>
              <td>{item.hour !== undefined ? `${item.hour}:00` : '-'}</td>
              <td>{item.end_time !== undefined ? `${item.end_time}:00` : '-'}</td>
            </tr>
          ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Songliste */}
        <section>
          <h3 className="mb-3">Songliste</h3>
          <div className="table-responsive">
            <table className="table liquid-glass-table striped align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titel</th>
                  <th>Interpret</th>
                  <th>Zeit</th>
                </tr>
              </thead>
              <tbody>
                {songs.length === 0 && (
                  <tr>
                    <td colSpan={4}>Keine Daten</td>
                  </tr>
                )}
                {songs.map((song, idx) => (
                  <tr key={song.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{song.title}</td>
                    <td>{song.artist?.name}</td>
                    <td>{song.started_at ? new Date(song.started_at).toLocaleTimeString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}

export default Schedule;