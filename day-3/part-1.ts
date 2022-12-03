import sum from '../lib/sum.ts';
import getLetterPriority from './lib/getLetterPriority.ts';

const getSharedLetters = (rucksackA: string, rucksackB: string): string[] => {
  const rucksackALetters = rucksackA.split('');
  return rucksackALetters.filter(aLetter =>
    rucksackB.includes(aLetter)
  );
};

const input = await Deno.readTextFile('day-3/input.txt');
const rucksacks = input.trim().split('\n');

const rucksacksCompartments = rucksacks.map((rucksack): [string, string] => {
  const compartmentSize = Math.round(rucksack.length / 2);
  return [ rucksack.slice(0, compartmentSize), rucksack.slice(compartmentSize) ];
});

const sharedLetterByRucksack = rucksacksCompartments.map(([ rucksackA, rucksackB ]) =>
  getSharedLetters(rucksackA, rucksackB)[0]
);

const priorityByRucksack = sharedLetterByRucksack.map(getLetterPriority);
const sumOfPriorities = sum(priorityByRucksack);
console.log(sumOfPriorities);
