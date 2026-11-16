import { Maximize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SAMPLE_SRC = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

type Props = {
  poster?: string;
  resumeKey?: string;
  onProgress?: (pct: number) => void;
  onEnded?: () => void;
  className?: string;
};

export function VideoPlayer({ poster, resumeKey, onProgress, onEnded, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [muted, setMuted] = useState(false);
  const [resumed, setResumed] = useState<number | null>(null);

  useEffect(() => {
    setPlaying(false);
    setTime(0);
    setResumed(null);
  }, [resumeKey]);

  const onLoaded = () => {
    const v = ref.current;
    if (!v) return;
    setDur(v.duration);
    v.playbackRate = speed;
    if (resumeKey) {
      const saved = Number(localStorage.getItem(`resume:${resumeKey}`) || 0);
      if (saved > 2 && saved < v.duration - 2) {
        v.currentTime = saved;
        setResumed(saved);
      }
    }
  };

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const changeSpeed = (s: number) => {
    setSpeed(s);
    if (ref.current) ref.current.playbackRate = s;
  };

  const fullscreen = () => {
    const el = wrap.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div ref={wrap} className={cn("group relative overflow-hidden rounded-xl bg-ink", className)}>
      <video
        ref={ref}
        src={SAMPLE_SRC}
        poster={poster}
        className="aspect-video w-full bg-ink object-contain"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={onLoaded}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setTime(v.currentTime);
          if (resumeKey) localStorage.setItem(`resume:${resumeKey}`, String(v.currentTime));
          if (v.duration) onProgress?.((v.currentTime / v.duration) * 100);
        }}
        onEnded={() => {
          if (resumeKey) localStorage.removeItem(`resume:${resumeKey}`);
          onEnded?.();
        }}
        playsInline
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
      />
      {!playing && (
        <button onClick={toggle} className="absolute inset-0 grid place-items-center bg-ink/30" aria-label="Play">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift">
            <Play className="ml-1 h-7 w-7" />
          </span>
        </button>
      )}
      {resumed !== null && !playing && (
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 text-xs text-ink-foreground">
          <RotateCcw className="h-3 w-3" /> Resuming from {fmt(resumed)}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-3 pb-2 pt-8 text-ink-foreground">
        <input
          type="range"
          min={0}
          max={dur || 0}
          step={0.1}
          value={time}
          onChange={(e) => ref.current && (ref.current.currentTime = Number(e.target.value))}
          className="h-1 w-full cursor-pointer accent-teal"
          aria-label="Seek"
        />
        <div className="mt-1 flex items-center gap-3 text-xs">
          <button onClick={toggle} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</button>
          <button onClick={() => { setMuted(!muted); if (ref.current) ref.current.muted = !muted; }} aria-label="Mute">{muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}</button>
          <span className="tabular-nums">{fmt(time)} / {fmt(dur)}</span>
          <div className="ml-auto flex items-center gap-3">
            <select
              value={speed}
              onChange={(e) => changeSpeed(Number(e.target.value))}
              className="rounded bg-ink-foreground/15 px-1.5 py-0.5 text-xs text-ink-foreground outline-none"
              aria-label="Playback speed"
            >
              {SPEEDS.map((s) => <option key={s} value={s} className="text-foreground">{s}x</option>)}
            </select>
            <button onClick={fullscreen} aria-label="Fullscreen"><Maximize className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
