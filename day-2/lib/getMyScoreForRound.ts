import type { Round } from './types.ts';

import { myShapeToOpponentShapeToOutcome, outcomesToScores, shapesToScores } from './constants.ts';

const getMyScoreForRound = (round: Round): number => {
  const outcome = myShapeToOpponentShapeToOutcome[round.me][round.opponent];
  const outcomeScore = outcomesToScores[outcome];
  const shapeScore = shapesToScores[round.me];
  return outcomeScore + shapeScore;
};

export default getMyScoreForRound;
