import React, { useRef, useState, useEffect } from "react";

interface MusicPlayerProps {
  src: string;
  title?: string;
  artist?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  src,
  title = "Musik",
  artist = "",
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value);
    }
  };

  return (
    <div
      className="card shadow-lg text-light"
      style={{
      position: "fixed",
      bottom: "24px",
      right: "24px",
      zIndex: 1050,
      minWidth: 200,
      maxWidth: 340,
      width: "90vw",
      borderRadius: "1rem",
      border: "none",
      pointerEvents: "auto",
      overflow: "hidden",
      background: "rgba(30, 30, 40, 0.35)",
      backdropFilter: "blur(18px) saturate(180%)",
      WebkitBackdropFilter: "blur(18px) saturate(180%)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      borderTop: "1px solid rgba(255,255,255,0.15)",
      borderLeft: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="card-body p-3 d-flex flex-row align-items-center justify-content-between gap-2" style={{ width: "100%" }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <strong style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block", color: "#fff", textShadow: "0 1px 8px rgba(0,0,0,0.18)" }}>{title}</strong>
        {artist && (
        <div className="text-muted" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#e0e0e0", textShadow: "0 1px 8px rgba(0,0,0,0.10)" }}>
          {artist}
        </div>
        )}
      </div>
      <div className="d-flex align-items-center gap-2" style={{ flexShrink: 0 }}>
        <button
        className="btn btn-light btn-sm"
        onClick={togglePlay}
        type="button"
        style={{
          background: "rgba(255,255,255,0.35)",
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          color: "#222",
        }}
        >
        {isPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
        </button>
        <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="0.5"
        onChange={handleVolume}
        className="form-range"
        title="Lautstärke"
        style={{
          width: 80,
          marginLeft: 8,
          accentColor: "#fff",
          background: "rgba(255,255,255,0.15)",
          borderRadius: 8,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
        />
      </div>
      </div>
      <audio
      ref={audioRef}
      src={src}
      controls={false}
      />
    </div>
  );
};

export default MusicPlayer;