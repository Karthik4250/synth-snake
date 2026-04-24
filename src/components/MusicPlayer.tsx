import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Music2, Volume2 } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: string;
  color: string;
}

const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Velocity',
    artist: 'AI Artificer',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '06:12',
    color: 'var(--color-neon-cyan)'
  },
  {
    id: '2',
    title: 'Midnight Protocol',
    artist: 'Cyber-Dreamer',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '07:05',
    color: 'var(--color-neon-pink)'
  },
  {
    id: '3',
    title: 'Silicon Soul',
    artist: 'Digital Nomad',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: '05:01',
    color: 'var(--color-neon-green)'
  }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handleBack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="glass-panel p-6 flex flex-col gap-6 rounded-3xl relative overflow-hidden h-full">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
            <Music2 className="text-neon-cyan" size={18} />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Now Streaming</h3>
        </div>
        <div className="bg-neon-cyan/10 px-2 py-1 rounded text-[8px] font-mono text-neon-cyan border border-neon-cyan/20 uppercase tracking-tighter">
          High fidelity
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-6 py-6">
        <motion.div 
          key={currentTrack.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-44 h-44 rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-2 glass-panel"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-700/20" />
          <div className="w-full h-full border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
            <Music2 size={48} className="text-white/10" />
            
            {isPlaying && (
              <div className="absolute inset-0 flex justify-center gap-1.5 h-full items-center px-4">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['10%', `${20 + Math.random() * 60}%`, '10%'] }}
                    transition={{ repeat: Infinity, duration: 0.6 + Math.random() * 0.4, ease: "easeInOut" }}
                    className="w-1 rounded-full opacity-60"
                    style={{ backgroundColor: currentTrack.color }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <div className="text-center">
          <h2 className="text-xl font-bold font-sans tracking-tight">{currentTrack.title}</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-neon-cyan opacity-80 mt-1 font-mono">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="absolute h-full"
              style={{ 
                  width: `${progress}%`,
                  backgroundColor: currentTrack.color,
                  boxShadow: `0 0 12px ${currentTrack.color}`
              }}
            />
          </div>
          <div className="flex justify-between text-[8px] font-mono opacity-40">
            <span>{audioRef.current ? Math.floor(audioRef.current.currentTime / 60).toString().padStart(2, '0') + ':' + Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0') : '00:00'}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <button onClick={handleBack} className="p-3 text-white/40 hover:text-white transition-all hover:scale-110 active:scale-90">
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
          </button>

          <button onClick={handleNext} className="p-3 text-white/40 hover:text-white transition-all hover:scale-110 active:scale-90">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-2 px-2 opacity-30 group hover:opacity-100 transition-opacity">
            <Volume2 size={12} className="text-white" />
            <div className="flex-1 h-[2px] bg-white/10 rounded-full relative overflow-hidden">
                <div className="w-2/3 h-full bg-white rounded-full group-hover:bg-neon-cyan transition-colors" />
            </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
    </div>
  );
}
