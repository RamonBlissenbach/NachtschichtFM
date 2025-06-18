const API_BASE_URL = 'https://api.laut.fm';
const Station = 'averfm-mashup';

// Hole die letzten 10 Songs einer Station
export async function fetchLastSongs(station: string = Station) {
  const res = await fetch(`${API_BASE_URL}/station/${station}/last_songs`);
  if (!res.ok) throw new Error('Fehler beim Laden der Songs');
  return res.json();
}

// Hole den aktuellen Song einer Station
export async function fetchCurrentSong(station: string = Station) {
  const res = await fetch(`${API_BASE_URL}/station/${station}/current_song`);
  if (!res.ok) throw new Error('Fehler beim Laden des aktuellen Songs');
  return res.json();
}

// Hole den Sendeplan einer Station
export async function fetchSchedule(station: string = Station) {
  const res = await fetch(`${API_BASE_URL}/station/${station}/schedule`);
  if (!res.ok) throw new Error('Fehler beim Laden des Sendeplans');
  return res.json();
}

// Hole die Hörerzahl einer Station
export async function fetchListeners(station: string = Station) {
  const res = await fetch(`${API_BASE_URL}/station/${station}/listeners`);
  if (!res.ok) throw new Error('Fehler beim Laden der Hörerzahl');
  return res.json();
}