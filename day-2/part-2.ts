import type {
  OpponentShapeCode,
  Outcome,
  Round,
  Shape
} from './lib/types.ts';

import { opponentCodesToShapes } from './lib/constants.ts';
import getMyScoreForRound from './lib/getMyScoreForRound.ts';
import sum from '../lib/sum.ts';

type MyOutcomeCode = 'X' | 'Y' | 'Z'

const myCodesToOutcomes: Record<MyOutcomeCode, Outcome> = {
  X: 'loss',
  Y: 'draw',
  Z: 'win'
};

const myOutcomeToOpponentShapeToMyShape: Record<Outcome, Record<Shape, Shape>> = {
  loss: {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  },
  draw: {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
  },
  win: {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock'
  }
}

const input = await Deno.readTextFile('day-2/input.txt');
const inputRows = input.split('\n');

const strategyRounds: Round[] = inputRows.map(rowString => {
  const [ opponentShapeCode, myOutcomeCode ] = rowString.split(' ') as [ OpponentShapeCode, MyOutcomeCode ];
  const myOutcome = myCodesToOutcomes[myOutcomeCode];
  const opponentShape = opponentCodesToShapes[opponentShapeCode];
  const myShape = myOutcomeToOpponentShapeToMyShape[myOutcome][opponentShape];
  return {
    me: myShape,
    opponent: opponentShape
  };
});

const myScoresByRound = strategyRounds.map(getMyScoreForRound);
const myTotalScore = sum(myScoresByRound)
console.log(myTotalScore);
