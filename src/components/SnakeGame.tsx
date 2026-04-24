import React, { useRef, useEffect } from 'react';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw } from 'lucide-react';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    snake,
    food,
    score,
    isGameOver,
    isPaused,
    resetGame,
    setIsPaused,
    gridSize
  } = useSnakeGame(CANVAS_WIDTH, CANVAS_HEIGHT);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a0c'; // Theme dark bg
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Grid (Subtle)
    ctx.strokeStyle = 'rgba(0, 242, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= CANVAS_WIDTH; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i <= CANVAS_HEIGHT; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }

    // Draw Food
    ctx.fillStyle = '#ff2d55'; // Neon Pink
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff2d55';
    ctx.beginPath();
    ctx.arc(
      food.x * gridSize + gridSize / 2,
      food.y * gridSize + gridSize / 2,
      gridSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw Snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#ffffff' : '#39ff14'; // White Head, Neon Green tail
      ctx.shadowBlur = index === 0 ? 15 : 10;
      ctx.shadowColor = index === 0 ? '#ffffff' : '#39ff14';
      
      const padding = 1;
      const size = gridSize - padding * 2;
      
      // Rounded rect segment
      const r = 4;
      const x = segment.x * gridSize + padding;
      const y = segment.y * gridSize + padding;
      
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + size, y, x + size, y + size, r);
      ctx.arcTo(x + size, y + size, x, y + size, r);
      ctx.arcTo(x, y + size, x, y, r);
      ctx.arcTo(x, y, x + size, y, r);
      ctx.closePath();
      ctx.fill();
    });

  }, [snake, food, gridSize]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="mb-6 flex justify-between w-full max-w-[600px] px-4 font-mono">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest opacity-40">High Score</span>
          <div className="text-neon-cyan neon-text-cyan text-2xl font-bold">
            {score.toString().padStart(5, '0')}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest opacity-40">System State</span>
          <div className="text-neon-pink neon-text-pink text-xs uppercase tracking-widest mt-1">
            {isPaused ? 'TERMINATED' : 'EXECUTING'}
          </div>
        </div>
      </div>

      <div className="relative p-2 glass-panel rounded-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="rounded-lg shadow-2xl block bg-black/40"
        />

        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-10"
            >
              <div className="glass-panel p-12 rounded-[2rem] flex flex-col items-center max-w-sm w-full mx-4 border-white/20">
                {isGameOver ? (
                  <>
                    <h2 className="text-5xl font-bold text-neon-pink neon-text-pink mb-2 font-mono tracking-tighter uppercase italic">Death Log</h2>
                    <p className="text-white/40 mb-8 font-mono text-sm tracking-widest">SCORE_LOG: {score}</p>
                    <button
                      onClick={resetGame}
                      className="flex items-center gap-3 px-10 py-4 bg-white text-black font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase tracking-tighter"
                    >
                      <RotateCcw size={20} />
                      Re-Initialize
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-5xl font-bold text-neon-cyan neon-text-cyan mb-8 font-mono tracking-tighter italic uppercase">Interrupted</h2>
                    <button
                      onClick={() => setIsPaused(false)}
                      className="flex items-center gap-3 px-10 py-4 bg-neon-cyan text-black font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] uppercase tracking-tighter"
                    >
                      <Play size={20} />
                      Resume Link
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-6 text-white/20 text-[9px] uppercase tracking-[0.4em] font-medium">
        <span>[W,A,S,D] MANEUVER</span>
        <span>[SPACE] INTERRUPT</span>
      </div>
    </div>
  );
}
