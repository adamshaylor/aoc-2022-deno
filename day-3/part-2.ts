import sum from '../lib/sum.ts';
import getLetterPriority from './lib/getLetterPriority.ts';

const getSharedLetters = (rucksacks: string[]): string[] => {
  const [ firstRucksack, ...tailRucksacks ] = rucksacks;
  const firstRucksackLetters = firstRucksack.split('');
  return firstRucksackLetters.filter(firstRucksackLetter =>
    tailRucksacks.every(otherRucksack =>
      otherRucksack.includes(firstRucksackLetter)
    )
  );
};

const input = await Deno.readTextFile('day-3/input.txt');
const rucksacks = input.trim().split('\n');

const groupedRucksacks: string[][] = [];
rucksacks.forEach((rucksack, rucksackIndex) => {
  const groupIndex = Math.floor(rucksackIndex / 3);
  groupedRucksacks[groupIndex] ||= [];
  groupedRucksacks[groupIndex].push(rucksack);
});

const sharedLetterByGroup = groupedRucksacks.map(rucksacksInGroup =>
  getSharedLetters(rucksacksInGroup)[0]
);

const priorityByGroup = sharedLetterByGroup.map(getLetterPriority);
const sumOfPriorities = sum(priorityByGroup);
console.log(sumOfPriorities);
