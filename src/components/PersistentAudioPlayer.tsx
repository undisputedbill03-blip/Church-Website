import React, { useState, useRef, useEffect } from 'react';
import { useChurch } from '../context/ChurchContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Disc, 
  WifiOff, 
  FastForward, 
  ExternalLink 
} from 'lucide-react';

export const PersistentAudioPlayer: React.FC = () => {
  const { 
    currentAudio, 
    isPlaying, 
    togglePlay, 
    playbackRate, 
    setRate, 
    closeAudioPlayer,
    lowBandwidthMode,
    setActivePage 
  } = useChurch();

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentAudio]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  if (!currentAudio) return null;

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setCurrentTime(seekTo);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    setRate(rates[nextIdx]);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300">
      <audio
        ref={audioRef}
        src={currentAudio.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => togglePlay()}
      />

      {/* Minimized Pill Mode */}
      {isMinimized ? (
        <div className="max-w-md mx-auto px-4 mb-2">
          <div className="bg-vogr-navy text-white rounded-full px-4 py-2 shadow-2xl border border-vogr-gold/40 flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate">
              <Disc size={18} className={`text-vogr-gold ${isPlaying ? 'animate-spin' : ''}`} />
              <div className="truncate">
                <p className="text-xs font-semibold truncate text-white">{currentAudio.title}</p>
                <p className="text-[10px] text-slate-300 truncate">{currentAudio.speakerOrAuthor}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-vogr-gold text-vogr-navyDark flex items-center justify-center hover:bg-vogr-goldHover"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
              <button
                onClick={() => setIsMinimized(false)}
                className="p-1 text-slate-300 hover:text-white"
                title="Expand audio player"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Full Persistent VOGR Audio Bar */
        <div className="bg-vogr-navy text-white border-t-2 border-vogr-gold shadow-2xl px-4 py-3 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Track Info */}
            <div className="flex items-center space-x-3 w-full sm:w-1/3 truncate">
              <div className="w-10 h-10 rounded-lg bg-vogr-navyLight border border-vogr-gold/30 flex items-center justify-center shrink-0">
                <Disc size={20} className={`text-vogr-gold ${isPlaying ? 'animate-spin' : ''}`} />
              </div>
              <div className="truncate text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-vogr-gold/20 text-vogr-gold border border-vogr-gold/30">
                    {currentAudio.type === 'snippet' ? "Spoken Word Tape" : currentAudio.type}
                  </span>
                  {lowBandwidthMode && (
                    <span className="flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded">
                      <WifiOff size={10} />
                      <span>Low Data</span>
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold truncate text-white">{currentAudio.title}</h4>
                <p className="text-xs text-slate-300 truncate">{currentAudio.speakerOrAuthor}</p>
              </div>
            </div>

            {/* Central Controls & Scrubber */}
            <div className="flex flex-col items-center w-full sm:w-2/4 max-w-lg">
              <div className="flex items-center space-x-4 mb-1">
                <button
                  onClick={cyclePlaybackRate}
                  title="Playback speed (Tape study speed)"
                  className="px-2 py-0.5 text-[11px] font-bold rounded bg-vogr-navyLight hover:bg-slate-700 text-vogr-gold border border-vogr-gold/40"
                >
                  {playbackRate}x
                </button>

                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-vogr-gold hover:bg-vogr-goldHover text-vogr-navyDark flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5 fill-vogr-navyDark" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full hover:bg-vogr-navyLight text-slate-300 hover:text-white"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              {/* Scrubber */}
              <div className="w-full flex items-center space-x-2 text-[11px] text-slate-300">
                <span className="w-10 text-right font-mono">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.5"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-vogr-navyLight rounded-lg appearance-none cursor-pointer accent-vogr-gold"
                />
                <span className="w-10 font-mono">{currentAudio.duration || formatTime(duration)}</span>
              </div>
            </div>

            {/* Right side utility buttons */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setActivePage('sermons')}
                className="hidden md:flex items-center space-x-1 text-xs text-slate-300 hover:text-vogr-gold px-2 py-1 rounded hover:bg-vogr-navyLight"
              >
                <span>Tapes</span>
                <ExternalLink size={12} />
              </button>

              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 text-slate-300 hover:text-white"
                title="Minimize player"
              >
                <ChevronDown size={18} />
              </button>

              <button
                onClick={closeAudioPlayer}
                className="p-1 text-slate-300 hover:text-rose-400"
                title="Close player"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
