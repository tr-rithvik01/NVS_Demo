import { Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioSummaryPlayerProps {
  text: string;
  label?: string;
  description?: string;
}

export function AudioSummaryPlayer({
  text,
  label = "Listen",
  description = "Play the full article as audio in your browser.",
}: AudioSummaryPlayerProps) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    setSupported(true);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (!supported || typeof window === "undefined") {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const togglePlayback = () => {
    if (!supported || typeof window === "undefined") {
      return;
    }

    if (speaking && !paused) {
      window.speechSynthesis.pause();
      setPaused(true);
      return;
    }

    if (speaking && paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      return;
    }

    speak();
  };

  const restart = () => {
    if (!supported || !utteranceRef.current || typeof window === "undefined") {
      speak();
      return;
    }

    speak();
  };

  if (!text.trim()) {
    return null;
  }

  return (
    <div className="rounded-[2rem] border border-primary/15 bg-white/90 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
          <Volume2 size={18} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
            {label}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              disabled={!supported}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {speaking && !paused ? <Pause size={16} /> : <Play size={16} />}
              {speaking && !paused ? "Pause Audio" : paused ? "Resume Audio" : "Play Article"}
            </button>
            <button
              type="button"
              onClick={restart}
              disabled={!supported}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:text-slate-400"
            >
              <RotateCcw size={16} />
              Restart
            </button>
          </div>
          {!supported ? (
            <p className="mt-3 text-xs text-slate-500">
              Audio playback is not available in this browser.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
