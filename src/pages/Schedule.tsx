import PageTemplate from '../components/PageTemplate';

function countShowsToday(schedule: any[]) {
  const today = ['sun','mon','tue','wed','thu','fri','sat'][new Date().getDay()];
  return schedule.filter(item => item.day === today).length;
}

function Schedule({ listeners, songs, schedule }: { listeners: number, songs: any[], schedule: any[] }) {
  const showsToday = countShowsToday(schedule);
  const songsPlayed = songs.length > 0 ? songs.length : 0;

  return (
    <PageTemplate title="Programm" subtitle="Aktuelle Sendungen und Highlights">
      <div className="container py-4">

        {/* Stat Cards */}
        <section className="mb-5">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card bg-primary bg-opacity-75 text-light h-100 shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-people-fill display-5 me-3"></i>
                  <div>
                    <h5 className="card-title mb-1">Hörer aktuell</h5>
                    <p className="card-text fs-4 fw-bold mb-0">{listeners}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card bg-primary bg-opacity-75 text-light h-100 shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-music-note-beamed display-5 me-3"></i>
                  <div>
                    <h5 className="card-title mb-1">Songs gespielt</h5>
                    <p className="card-text fs-4 fw-bold mb-0">{songsPlayed}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card bg-primary bg-opacity-75 text-light h-100 shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-broadcast-pin display-5 me-3"></i>
                  <div>
                    <h5 className="card-title mb-1">Sendungen heute</h5>
                    <p className="card-text fs-4 fw-bold mb-0">{showsToday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Table */}
        <section className="mb-5">
          <h3 className="mb-3">Sendeplan</h3>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
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
            <table className="table table-striped align-middle">
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