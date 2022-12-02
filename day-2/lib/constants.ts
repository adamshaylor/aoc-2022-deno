import type { OpponentShapeCode, Outcome, Shape } from './types.ts';

export const opponentCodesToShapes: Record<OpponentShapeCode, Shape> = {
  A: 'rock',
  B: 'paper',
  C: 'scissors'
};

export const outcomesToScores: Record<Outcome, number> = {
  loss: 0,
  draw: 3,
  win: 6
};

export const shapesToScores: Record<Shape, number> = {
  rock: 1,
  paper: 2,
  scissors: 3
};

export const myShapeToOpponentShapeToOutcome: Record<Shape, Record<Shape, Outcome>> = {
  rock: {
    rock: 'draw',
    paper: 'loss',
    scissors: 'win'
  },
  paper: {
    rock: 'win',
    paper: 'draw',
    scissors: 'loss'
  },
  scissors: {
    rock: 'loss',
    paper: 'win',
    scissors: 'draw'
  }
};
