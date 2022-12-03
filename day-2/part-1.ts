import type { OpponentShapeCode, Round, Shape } from './lib/types.ts';

import { opponentCodesToShapes } from './lib/constants.ts';
import getMyScoreForRound from './lib/getMyScoreForRound.ts';
import sum from '../lib/sum.ts';

type MyShapeCode = 'X' | 'Y' | 'Z'

const myCodesToShapes: Record<MyShapeCode, Shape> = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissors'
};

const input = await Deno.readTextFile('day-2/input.txt');
const inputRows = input.trim().split('\n');

const strategyRounds: Round[] = inputRows.map(rowString => {
  const [ opponentCode, myCode ] = rowString.split(' ') as [ OpponentShapeCode, MyShapeCode ];
  return {
    me: myCodesToShapes[myCode],
    opponent: opponentCodesToShapes[opponentCode]
  };
});

const myScoresByRound = strategyRounds.map(getMyScoreForRound);
const myTotalScore = sum(myScoresByRound)
console.log(myTotalScore);
