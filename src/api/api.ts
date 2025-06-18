const API_BASE_URL = 'http://localhost:3001/api/v1';
const station = 'averfm-mashup';

export async function fetchLastSongs() {
  const url = station ? `${API_BASE_URL}/lautfm/last_songs?station=${station}` : `${API_BASE_URL}/last_songs`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fehler beim Laden der Songs');
  return res.json();
}

export async function fetchCurrentSong() {
  const url = station ? `${API_BASE_URL}/lautfm/current_song?station=${station}` : `${API_BASE_URL}/current_song`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fehler beim Laden des aktuellen Songs');
  return res.json();
}

export async function fetchSchedule() {
  const url = station ? `${API_BASE_URL}/lautfm/schedule?station=${station}` : `${API_BASE_URL}/schedule`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fehler beim Laden des Sendeplans');
  return res.json();
}

export async function fetchListeners() {
  const url = station ? `${API_BASE_URL}/lautfm/listeners?station=${station}` : `${API_BASE_URL}/listeners`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fehler beim Laden der Hörerzahl');
  return res.json();
}

export async function fetchTeam() {
  const res = await fetch(`${API_BASE_URL}/team/full`);
  if (!res.ok) throw new Error('Fehler beim Laden des Teams');
  return res.json();
}

export async function fetchStats() {
  const url = `${API_BASE_URL}/lautfm/stats`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fehler beim Laden der Stats');
  return res.json();
}