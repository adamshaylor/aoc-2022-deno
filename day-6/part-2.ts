import getEndIndexOfUniqueCharacterWindow from './lib/getEndIndexOfUniqueCharacterWindow.ts';

const input = await Deno.readTextFile('day-6/input.txt');
const datastreamBuffer = input.trim();
const startOfMessageMarkerLength = 14;
const startOfMessage = getEndIndexOfUniqueCharacterWindow(datastreamBuffer, startOfMessageMarkerLength);
console.log(startOfMessage);
