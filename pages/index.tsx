import { useEffect, useState, useMemo, useCallback } from 'react';

import Button from 'design-system/Button';

import Head from 'components/Head';
import FastForwardSVG from 'components/Icons/FastForward';
import RestartSVG from 'components/Icons/Restart';
import StopSVG from 'components/Icons/Stop';
import PlaySVG from 'components/Icons/Play';

type Cell = {
  x: number;
  y: number;
  isAlive?: boolean;
};

type Cells = Array<Cell>;

type GameConfig = {
  isStarted: boolean;
  debug: boolean;
  toggleDebug: () => void;
  interval: number;
  toggleInterval: () => void;
  restart: () => void;
  startOrPauseGame: () => void;
};

const GRID_SIZE = 30;
const INTERVAL = 400;

const getAdjacents = (point: Omit<Cell, 'isAlive'>) => {
  const adjacents = [];

  if (point.x - 1 >= 0) {
    adjacents.push({ x: point.x - 1, y: point.y });

    if (point.y - 1 >= 0) {
      adjacents.push({ x: point.x - 1, y: point.y - 1 });
    }

    if (point.y + 1 < GRID_SIZE) {
      adjacents.push({ x: point.x - 1, y: point.y + 1 });
    }
  }

  if (point.x + 1 < GRID_SIZE) {
    adjacents.push({ x: point.x + 1, y: point.y });

    if (point.y - 1 >= 0) {
      adjacents.push({ x: point.x + 1, y: point.y - 1 });
    }

    if (point.y + 1 < GRID_SIZE) {
      adjacents.push({ x: point.x + 1, y: point.y + 1 });
    }
  }

  if (point.y - 1 >= 0) {
    adjacents.push({ x: point.x, y: point.y - 1 });
  }

  if (point.y + 1 < GRID_SIZE) {
    adjacents.push({ x: point.x, y: point.y + 1 });
  }

  return adjacents;
};

const checkIsEquivalentCell = (CellA: Cell, CellB: Cell) => CellA.x === CellB.x && CellA.y === CellB.y;

const Grid = ({ cells, handleEvent, debug }: { cells: Cells; handleEvent: (cell: Cell) => void; debug: boolean }) => {
  const [adjacents, setAdjacents] = useState([]);

  return (
    <div
      className="w-full h-full gap-0.5 grid"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {cells.map(cell => (
        <div
          key={`x${cell.x}y${cell.y}`}
          onMouseEnter={() => {
            setAdjacents(getAdjacents(cell));
          }}
          role="button"
          tabIndex={0}
          onClick={() => handleEvent(cell)}
          onKeyPress={() => handleEvent(cell)}
          className={`${
            debug && adjacents.filter(adjacent => checkIsEquivalentCell(adjacent, cell)).length > 0
              ? 'bg-pink-400 '
              : ''
          }${cell.isAlive ? 'bg-green-400' : 'bg-gray-200'} text-xs`}
        >
          {debug && `x${cell.x} y${cell.y}`}
        </div>
      ))}
    </div>
  );
};

const Config = ({
  config: { debug, toggleDebug, isStarted, interval, toggleInterval, restart, startOrPauseGame },
}: {
  config: GameConfig;
}) => {
  const FastFowardButton = () => (
    <Button onClick={toggleInterval} isActive={interval !== INTERVAL}>
      <FastForwardSVG />
    </Button>
  );

  const RestartButton = () => (
    <Button onClick={restart}>
      <RestartSVG />
    </Button>
  );

  const StartButton = () => (
    <Button onClick={startOrPauseGame} primary>
      {isStarted ? <StopSVG /> : <PlaySVG />}
    </Button>
  );

  return (
    <div className="flex space-x-4">
      <RestartButton />
      <StartButton />
      <FastFowardButton />
      <Button onClick={toggleDebug} isActive={debug}>
        debug
      </Button>
    </div>
  );
};

export default function Game() {
  const initialGrid = useMemo(
    () =>
      Array.from(Array(GRID_SIZE * GRID_SIZE), (_, i) => ({
        x: i % GRID_SIZE,
        y: Math.abs(Math.floor(i / GRID_SIZE) - GRID_SIZE + 1),
        isAlive: Math.random() < 0.2,
      })),
    [],
  );

  const [cells, setCells] = useState<Cells>([]);
  const [delayInterval, setDelayInterval] = useState(INTERVAL);
  const [isStarted, setGameStatus] = useState(false);
  const [debug, setDebug] = useState(false);

  const getNextGeneration = useCallback((grid: Cells) => {
    return grid.map(cell => {
      const aliveAdjacents = getAdjacents(cell)
        .map(adjacent => grid.find(cell => checkIsEquivalentCell(adjacent, cell) && cell.isAlive))
        .filter(cell => cell);

      if (cell.isAlive && aliveAdjacents.length >= 2 && aliveAdjacents.length <= 3) {
        return { ...cell, isAlive: true };
      }

      if (!cell.isAlive && aliveAdjacents.length === 3) {
        return { ...cell, isAlive: true };
      }

      return { ...cell, isAlive: false };
    });
  }, []);

  const toggleCellState = ({ x, y }: Cell) => {
    if (isStarted) return;

    setCells(
      cells.map(cell => {
        if (checkIsEquivalentCell(cell, { x, y })) {
          return { ...cell, isAlive: !cell.isAlive };
        }
        return cell;
      }),
    );
  };

  const restart = () => {
    setCells(initialGrid);
    setGameStatus(false);
  };

  useEffect(() => {
    setCells(initialGrid);
  }, [initialGrid]);

  useEffect(() => {
    const interval = setInterval(() => setCells(getNextGeneration(cells)), delayInterval);

    if (!isStarted) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [cells, delayInterval, getNextGeneration, isStarted]);

  return (
    <div className="flex flex-col h-screen w-screen items-center space-y-4 p-4">
      <Head />
      <Grid cells={cells} handleEvent={toggleCellState} debug={debug} />
      <Config
        config={{
          isStarted,
          interval: delayInterval,
          debug,
          toggleDebug: () => setDebug(!debug),
          toggleInterval: () => setDelayInterval(delayInterval === INTERVAL ? INTERVAL / 2 : INTERVAL),
          restart,
          startOrPauseGame: () => setGameStatus(!isStarted),
        }}
      />
    </div>
  );
}
