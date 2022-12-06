import getEndIndexOfUniqueCharacterWindow from './lib/getEndIndexOfUniqueCharacterWindow.ts';

const input = await Deno.readTextFile('day-6/input.txt');
const datastreamBuffer = input.trim();
const startOfPacketMarkerLength = 4;
const startOfPacket = getEndIndexOfUniqueCharacterWindow(datastreamBuffer, startOfPacketMarkerLength);
console.log(startOfPacket);
