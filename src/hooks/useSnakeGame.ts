import { useState, useEffect, useCallback, useRef } from 'react';

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = 'UP';
const INITIAL_SPEED = 150;

export function useSnakeGame(canvasWidth: number, canvasHeight: number) {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(true);

  const nextDirection = useRef<Direction>(INITIAL_DIRECTION);

  const cols = Math.floor(canvasWidth / GRID_SIZE);
  const rows = Math.floor(canvasHeight / GRID_SIZE);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
      };
      // Ensure food doesn't land on snake
      const onSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [cols, rows]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    nextDirection.current = INITIAL_DIRECTION;
    setIsGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      setDirection(nextDirection.current);
      const newHead = { ...head };

      switch (nextDirection.current) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check wall collisions
      if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
        setIsGameOver(true);
        return prevSnake;
      }

      // Check self collisions
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        const nextScore = score + 10;
        setScore(nextScore);
        setFood(generateFood(newSnake));
        // Increase speed
        if (speed > 50) setSpeed(prev => prev - 2);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, isGameOver, isPaused, score, speed, generateFood, cols, rows]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') nextDirection.current = 'UP'; break;
        case 'ArrowDown': if (direction !== 'UP') nextDirection.current = 'DOWN'; break;
        case 'ArrowLeft': if (direction !== 'RIGHT') nextDirection.current = 'LEFT'; break;
        case 'ArrowRight': if (direction !== 'LEFT') nextDirection.current = 'RIGHT'; break;
        case ' ': setIsPaused(p => !p); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      const interval = setInterval(moveSnake, speed);
      return () => clearInterval(interval);
    }
  }, [isPaused, isGameOver, moveSnake, speed]);

  return {
    snake,
    food,
    score,
    isGameOver,
    isPaused,
    resetGame,
    setIsPaused,
    gridSize: GRID_SIZE
  };
}
