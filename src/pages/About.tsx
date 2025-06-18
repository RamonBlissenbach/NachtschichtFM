import PageTemplate from '../components/PageTemplate';
import { useEffect, useState } from 'react';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import SpotlightCard from '../blocks/Components/SpotlightCard/SpotlightCard';


type User = { id: string; username: string; avatar: string | null; role: string; category: string };

function getAvatarUrl(id: string, avatar: string | null) {
  if (avatar) {
    return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  }
  const discrim = parseInt(id) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${discrim}.png`;
}

function groupByCategory(users: User[]) {
  return users.reduce((acc, user) => {
    acc[user.category] = acc[user.category] || [];
    acc[user.category].push(user);
    return acc;
  }, {} as Record<string, User[]>);
}

function About() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/team/full')
      .then(async (res) => {
        if (!res.ok) throw new Error(`Fehler: ${res.status}`);
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(`Fehler beim Laden: ${err.message}`));
  }, []);

  const grouped = groupByCategory(users);

  return (
    <PageTemplate title="Über uns" subtitle="Wir sind das Team hinter Nachtschicht">
      <AnimatedContent distance={100} direction="vertical" reverse={false} duration={1.5} ease="power3.out" initialOpacity={0} animateOpacity scale={1} threshold={0.1} delay={0.2}>
        <div className="container py-5">
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <div className="text-center">
            {Object.entries(grouped).map(([category, members]) => (
              <div key={category} className="mb-5">
                <h3 className="mb-4">{category}</h3>
                <div className="row justify-content-center g-4">
                  {members.map((user) => (
                    <div className="col-md-4 mb-4 d-flex justify-content-center" key={user.id}>
                      <SpotlightCard
                        className="custom-spotlight-card h-100 d-flex align-items-center justify-content-center"
                        spotlightColor="rgba(0, 20, 255, 0.5)">
                        <div
                          className="card-body text-center d-flex flex-column align-items-center justify-content-center w-100 h-100"
                          style={{ minWidth: 250, minHeight: 250 }}>                          <img
                            src={getAvatarUrl(user.id, user.avatar)}
                            className="card-img-top rounded-circle mx-auto mt-3"
                            alt={user.username}
                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                          />
                          <h5 className="card-title mt-3">{user.username}</h5>
                          <span style={{ color: "#888" }}>{user.role}</span>
                        </div>
                      </SpotlightCard>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedContent>
    </PageTemplate>
  );
}

export default About;