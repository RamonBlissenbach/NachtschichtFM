import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';

import MusicPlayer from "./components/MusicPlayer";
import Header from './components/Header';

import { fetchCurrentSong, fetchListeners, fetchLastSongs, fetchSchedule } from './api/api';

function App() {

  const [currentSong, setCurrentSong] = useState<{ title: string; artist: { name: string } } | null>(null);
  const [listeners, setListeners] = useState<number>(0);
  const [songs, setSongs] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", "dark");

    fetchCurrentSong().then(setCurrentSong).catch(() => setCurrentSong(null));
    fetchListeners().then(setListeners).catch(() => setListeners(0));
    fetchLastSongs().then(setSongs).catch(() => setSongs([]));
    fetchSchedule().then(setSchedule).catch(() => setSchedule([]));

    const interval = setInterval(() => {
      fetchCurrentSong().then(setCurrentSong).catch(() => setCurrentSong(null));
      fetchListeners().then(setListeners).catch(() => setListeners(0));
      fetchLastSongs().then(setSongs).catch(() => setSongs([]));
      fetchSchedule().then(setSchedule).catch(() => setSchedule([]));
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  return (
    <Router>
      <Header />
      <MusicPlayer
        src="https://stream.laut.fm/averfm-mashup"
        title={currentSong?.title || ''}
        artist={currentSong?.artist?.name || ''}
      />
      <Routes>
        <Route path="/" element={<Home listeners={listeners} songs={songs} schedule={schedule} />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedule" element={<Schedule listeners={listeners} songs={songs} schedule={schedule} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;