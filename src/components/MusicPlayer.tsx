import React, { useRef, useState, useEffect } from "react";
import StarBorder from "../blocks/Animations/StarBorder/StarBorder";
import Threads from "../blocks/Backgrounds/Threads/Threads";

interface MusicPlayerProps {
  src: string;
  title?: string;
  artist?: string;
}

const GRID_SIZE = 24;
const SNAP_MARGIN = 32;
const LOCAL_STORAGE_KEY = "musicplayer-position";

const getSnappedPosition = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Snap an die vier Ecken, wenn nah genug
  const corners = [
    { x: 0 + 24, y: 0 + 24 }, // oben links
    { x: vw - width - 24, y: 0 + 24 }, // oben rechts
    { x: 0 + 24, y: vh - height - 24 }, // unten links
    { x: vw - width - 24, y: vh - height - 24 }, // unten rechts
  ];
  for (const corner of corners) {
    if (
      Math.abs(x - corner.x) < SNAP_MARGIN &&
      Math.abs(y - corner.y) < SNAP_MARGIN
    ) {
      return { x: corner.x, y: corner.y };
    }
  }
  // Sonst auf Grid snappen
  return {
    x: Math.round(x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(y / GRID_SIZE) * GRID_SIZE,
  };
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  src,
  title = "Musik",
  artist = "",
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    // Versuche, Position aus localStorage zu laden
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          typeof parsed.x === "number" &&
          typeof parsed.y === "number"
        ) {
          return parsed;
        }
      }
    } catch {}
    // Default: unten rechts
    const width = 380;
    const height = 150;
    return {
      x: window.innerWidth - width - 24,
      y: window.innerHeight - height - 24,
    };
  });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update Position bei Resize, damit Player sichtbar bleibt
  useEffect(() => {
    const handleResize = () => {
      if (!playerRef.current) return;
      const rect = playerRef.current.getBoundingClientRect();
      let { x, y } = position;
      if (x + rect.width > window.innerWidth)
        x = window.innerWidth - rect.width - 24;
      if (y + rect.height > window.innerHeight)
        y = window.innerHeight - rect.height - 24;
      setPosition({ x: Math.max(0, x), y: Math.max(0, y) });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position]);

  // Drag Events
  useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e: MouseEvent) => {
      if (!playerRef.current) return;
      const width = playerRef.current.offsetWidth;
      const height = playerRef.current.offsetHeight;
      let x = e.clientX - dragOffset.current.x;
      let y = e.clientY - dragOffset.current.y;
      // Begrenzung auf Viewport
      x = Math.max(0, Math.min(x, window.innerWidth - width));
      y = Math.max(0, Math.min(y, window.innerHeight - height));
      setPosition({ x, y });
    };
    const onMouseUp = () => {
      if (!playerRef.current) return;
      const width = playerRef.current.offsetWidth;
      const height = playerRef.current.offsetHeight;
      const snapped = getSnappedPosition(position.x, position.y, width, height);
      setPosition(snapped);
      setDragging(false);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging, position]);

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
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  // Speichere Position in localStorage, wenn sie sich ändert
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(position));
  }, [position]);

  return (
    // eslint-disable-next-line
    <StarBorder
      as="div"
      ref={playerRef}
      className="card shadow-lg text-light"
      color="white"
      speed="5s"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 1050,
        minWidth: 220,
        maxWidth: 360,
        width: "90vw",
        pointerEvents: "auto",
        overflow: "hidden",
        backdropFilter: "blur(5px) ",
        WebkitBackdropFilter: "blur(5px)",
        background: "rgba(31, 38, 135, 0.1)",
        boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.37)",
        willChange: "translateZ(0)",
        transform: "transform",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: dragging ? "none" : "auto",
      }}
      onMouseDown={(e) => {
        // Nur Drag starten, wenn auf den oberen Bereich (z.B. Titelzeile) geklickt wird
        if (
          (e.target as HTMLElement).closest(".musicplayer-drag-handle") ||
          (e.target as HTMLElement).classList.contains("musicplayer-drag-handle")
        ) {
          if (!playerRef.current) return;
          const rect = playerRef.current.getBoundingClientRect();
          dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          };
          setDragging(true);
        }
      }}
    >
      <div
        className="musicplayer-drag-handle"
        style={{
          width: "100%",
          height: 28,
          cursor: dragging ? "grabbing" : "grab",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
        title="Zum Verschieben ziehen"
      />
      <div style={{ width: "100%", top: "-10px", position: "absolute", opacity: 0.3 }}>
        <Threads
          amplitude={isPlaying ? 1 : 0}
          distance={0}
          enableMouseInteraction={false}
        />
      </div>
      <div
        className="card-body p-3 d-flex flex-row align-items-center justify-content-between gap-2"
        style={{ width: "100%" }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <strong
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
              color: "#ddd",
              textShadow: "0 2px 6px rgba(0, 153, 255, 0.89)",
              fontWeight: 600,
              letterSpacing: 0.2,
              fontSize: "1.08rem",
            }}
          >
            {title}
          </strong>
          {artist && (
            <div
              className="text-muted"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "#ddd",
                fontWeight: 400,
                fontSize: "0.98rem",
              }}
            >
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
              background: "rgba(255,255,255,0.1)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              boxShadow:
                "0 4px 24px 0 rgba(31,38,135,0.18), 0 1.5px 8px rgba(0,153,255,0.11)",
              backdropFilter: "blur(18px) saturate(180%)",
              WebkitBackdropFilter: "blur(18px) saturate(180%)",
              color: "#bbb",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition:
                "background 0.2s, box-shadow 0.2s, border 0.2s, color 0.2s",
              outline: "none",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,153,255,0.18)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 32px 0 rgba(0,153,255,0.22), 0 2px 12px rgba(0,153,255,0.18)";
              (e.currentTarget as HTMLButtonElement).style.border = "1.5px solid #09f";
              (e.currentTarget as HTMLButtonElement).style.color = "#007aff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.25)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 24px 0 rgba(31,38,135,0.18), 0 1.5px 8px rgba(0,153,255,0.11)";
              (e.currentTarget as HTMLButtonElement).style.border = "1.5px solid rgba(255,255,255,0.35)";
              (e.currentTarget as HTMLButtonElement).style.color = "#bbb";
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(120deg, rgba(0,153,255,0.08) 0%, rgba(255,255,255,0.12) 100%)",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>
              {isPlaying ? (
                <i
                  className="bi bi-pause-fill"
                  style={{
                    fontSize: 22,
                    filter: "drop-shadow(0 2px 6px #09f7)",
                  }}
                ></i>
              ) : (
                <i
                  className="bi bi-play-fill"
                  style={{
                    fontSize: 22,
                    filter: "drop-shadow(0 2px 6px #09f7)",
                  }}
                ></i>
              )}
            </span>
          </button>
          <div
            style={{
              position: "relative",
              width: 90,
              marginLeft: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolume}
              className="form-range"
              title="Lautstärke"
              style={{
                width: "100%",
                accentColor: "#09f",
                background: "linear-gradient(90deg, #09f 0%, #fff 100%)",
                borderRadius: 8,
                boxShadow: "0 2px 12px 0 rgba(0,153,255,0.13)",
                height: 6,
                outline: "none",
                border: "none",
                appearance: "none",
                WebkitAppearance: "none",
                position: "relative",
                zIndex: 1,
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLInputElement).style.boxShadow =
                  "0 4px 24px 0 rgba(0,153,255,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLInputElement).style.boxShadow =
                  "0 2px 12px 0 rgba(0,153,255,0.13)";
              }}
            />
            {/* Custom thumb styling */}
            <style>
              {`
                input[type="range"].form-range::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  background: linear-gradient(120deg, #09f 60%, #fff 100%);
                  border: 2.5px solid #fff;
                  box-shadow: 0 2px 8px 0 #09f7, 0 1px 4px #09f3;
                  cursor: pointer;
                  transition: background 0.2s, box-shadow 0.2s;
                  margin-top: -6px;
                }
                input[type="range"].form-range:focus::-webkit-slider-thumb {
                  background: linear-gradient(120deg, #fff 0%, #09f 100%);
                  box-shadow: 0 4px 16px 0 #09f7, 0 2px 8px #09f3;
                }
                input[type="range"].form-range::-moz-range-thumb {
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  background: linear-gradient(120deg, #09f 60%, #fff 100%);
                  border: 2.5px solid #fff;
                  box-shadow: 0 2px 8px 0 #09f7, 0 1px 4px #09f3;
                  cursor: pointer;
                  transition: background 0.2s, box-shadow 0.2s;
                }
                input[type="range"].form-range:focus::-moz-range-thumb {
                  background: linear-gradient(120deg, #fff 0%, #09f 100%);
                  box-shadow: 0 4px 16px 0 #09f7, 0 2px 8px #09f3;
                }
                input[type="range"].form-range::-ms-thumb {
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  background: linear-gradient(120deg, #09f 60%, #fff 100%);
                  border: 2.5px solid #fff;
                  box-shadow: 0 2px 8px 0 #09f7, 0 1px 4px #09f3;
                  cursor: pointer;
                  transition: background 0.2s, box-shadow 0.2s;
                }
                input[type="range"].form-range:focus::-ms-thumb {
                  background: linear-gradient(120deg, #fff 0%, #09f 100%);
                  box-shadow: 0 4px 16px 0 #09f7, 0 2px 8px #09f3;
                }
                input[type="range"].form-range::-webkit-slider-runnable-track {
                  height: 6px;
                  border-radius: 8px;
                  background: linear-gradient(90deg, #09f 0%, #fff 100%);
                }
                input[type="range"].form-range::-ms-fill-lower {
                  background: #09f;
                  border-radius: 8px;
                }
                input[type="range"].form-range::-ms-fill-upper {
                  background: #fff;
                  border-radius: 8px;
                }
                input[type="range"].form-range:focus {
                  outline: none;
                }
              `}
            </style>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={src} controls={false} style={{ display: "none" }} />
    </StarBorder>
  );
};

export default MusicPlayer;