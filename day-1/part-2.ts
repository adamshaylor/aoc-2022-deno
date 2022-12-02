import convertInputToElvesRationsCalories from './lib/convertInputToElvesRationsCalories.ts';
import sum from '../lib/sum.ts';

const input = await Deno.readTextFile('day-1/input.txt');
const elvesRationsCalories = convertInputToElvesRationsCalories(input);
const elvesCalories: number[] = elvesRationsCalories.map(sum);
const sortedElvesCalories = Array.from(elvesCalories).sort((a, b) => b - a);
const topThreeElvesCalories = sortedElvesCalories.slice(0, 3);
const totalCaloriesOfTopThreeElves = sum(topThreeElvesCalories);

console.log(totalCaloriesOfTopThreeElves);
