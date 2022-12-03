import convertInputToElvesRationsCalories from './lib/convertInputToElvesRationsCalories.ts';
import sum from '../lib/sum.ts';

const input = await Deno.readTextFile('day-1/input.txt');
const elvesRationsCalories = convertInputToElvesRationsCalories(input.trim());

const mostCaloriesAnElfIsCarrying: number = elvesRationsCalories.reduce(
  (lastHighestCalories, currentElfRations) => {
    const currentElfCallories = sum(currentElfRations);
    return currentElfCallories > lastHighestCalories
      ? currentElfCallories
      : lastHighestCalories
  },
  0
);

console.log(mostCaloriesAnElfIsCarrying);
