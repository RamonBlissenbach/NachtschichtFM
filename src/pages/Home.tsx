import PageTemplate from '../components/PageTemplate';

function countShowsToday(schedule: any[]) {
  const today = ['sun','mon','tue','wed','thu','fri','sat'][new Date().getDay()];
  return schedule.filter(item => item.day === today).length;
}

function Home({ listeners, songs, schedule }: { listeners: number, songs: any[], schedule: any[] }) {
  const showsToday = countShowsToday(schedule);
  const songsPlayed = songs.length > 0 ? songs.length : 0;

  return (
    <PageTemplate title="Nachtschicht FM" subtitle="Dein Darktheme Radio">
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

        {/* Über Uns Bereich */}
        <section className="my-5 py-4 border-top border-bottom">
          <div className="row align-items-center">
            <div className="col-12 col-md-7 mb-4 mb-md-0">
              <h2 className="fw-bold mb-4 text-primary">
                <i className="bi bi-people me-2"></i>
                ÜBER UNS
              </h2>
              <p className="lead mb-3">
                Nachtschicht FM ist dein Radiosender für die späten Stunden. Unser Team aus Musikliebhabern sorgt jede Nacht für die beste Auswahl an Songs, spannende Sendungen und aktuelle Nachrichten.
              </p>
              <p>
                Wir sind ein junges, engagiertes Team und freuen uns, gemeinsam mit dir die Nacht zu gestalten! Werde Teil unserer Community und genieße Musik, Infos und Unterhaltung rund um die Uhr.
              </p>
            </div>
            <div className="col-12 col-md-5 text-center">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80"
                alt="Über uns"
                className="img-fluid rounded shadow"
                style={{ maxHeight: 250, objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Dienstleistungen Bereich */}
        <section className="mb-5">
          <div className="text-center mb-4">
            <span className="fw-bold fs-2 px-4 py-2 rounded bg-primary text-white d-inline-block">
              Unsere Highlights
            </span>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
              <div className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary rounded-circle" style={{width: 100, height: 100}}>
                <i className="bi bi-cash-stack fs-1 text-white"></i>
              </div>
              <h4 className="fw-bold">Lorem ipsum dolor sit amet</h4>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
              <div className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary rounded-circle" style={{width: 100, height: 100}}>
                <i className="bi bi-mic-fill fs-1 text-white"></i>
              </div>
              <h4 className="fw-bold">Lorem ipsum dolor sit amet</h4>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.              </p>
            </div>
            <div className="col-12 col-md-4 text-center">
              <div className="mx-auto mb-3 d-flex align-items-center justify-content-center bg-primary rounded-circle" style={{width: 100, height: 100}}>
                <i className="bi bi-newspaper fs-1 text-white"></i>
              </div>
              <h4 className="fw-bold">Lorem ipsum dolor sit amet</h4>
              <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.              </p>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}

export default Home;