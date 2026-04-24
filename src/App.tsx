import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Zap, Terminal, Activity } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen mesh-gradient text-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="h-20 px-10 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-neon-pink to-neon-cyan flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,242,255,0.4)]">
            <Zap size={22} className="text-black fill-current" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">
            Synth<span className="text-neon-cyan neon-text-cyan">Snake</span>
          </h1>
        </div>

        <div className="glass-panel px-8 py-3 flex items-center gap-12 rounded-2xl">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1">Session</span>
            <span className="text-xs font-mono">12:44</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-1">Status</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_5px_var(--color-neon-green)]" />
              <span className="text-xs uppercase font-mono tracking-wider">Active</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="w-10 h-10 glass-panel flex items-center justify-center rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
            <Terminal size={18} className="text-white/60" />
          </div>
          <div className="w-10 h-10 glass-panel flex items-center justify-center rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
            <Activity size={18} className="text-white/60" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row p-8 gap-8 max-w-7xl mx-auto w-full z-10 items-start">
        {/* Left Side: Game Center */}
        <section className="flex-[2] w-full flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center"
          >
            <SnakeGame />
          </motion.div>
        </section>

        {/* Right Side: Player & Stats */}
        <aside className="flex-1 flex flex-col gap-8 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MusicPlayer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-6 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl rounded-full" />
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-4 flex items-center gap-2">
              <div className="w-1 h-1 bg-neon-cyan rounded-full" />
              Navigation Module
            </h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-white/20 uppercase tracking-widest leading-none">Maneuver</span>
                <span className="text-xs font-mono text-neon-cyan tracking-tight uppercase">Arrows / WASD</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-white/20 uppercase tracking-widest leading-none">Pause</span>
                <span className="text-xs font-mono text-neon-pink tracking-tight uppercase">Space Bar</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-white/20 uppercase tracking-widest leading-none">Latency</span>
                <span className="text-xs font-mono tracking-tight uppercase">14 MS</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-white/20 uppercase tracking-widest leading-none">Edition</span>
                <span className="text-xs font-mono text-neon-green tracking-tight uppercase">Enterprize</span>
              </div>
            </div>
          </motion.div>
        </aside>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-10 px-10 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] opacity-40 z-20 bg-black/20 backdrop-blur-sm">
        <div>Control Link: [SECURE_ENCRYPTED]</div>
        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-neon-cyan rounded-full shadow-[0_0_5px_var(--color-neon-cyan)]" />
            System Temp: 42°C
          </div>
          <span>Server: Tokyo-Neo-1</span>
          <span className="text-neon-pink">V.2.0-STABLE</span>
        </div>
      </footer>
    </div>
  );
}
