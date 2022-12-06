const getEndIndexOfUniqueCharacterWindow = (buffer: string, windowLength: number): number | undefined => {
  for (
    let startIndex = 0, endIndex = startIndex + windowLength;
    endIndex <= buffer.length;
    startIndex += 1, endIndex += 1
  ) {
    const bufferWindow = buffer.slice(startIndex, endIndex);
    const windowCharacters = bufferWindow.split('');
    if ((new Set(windowCharacters)).size === windowCharacters.length) {
      return endIndex;
    }
  }  
};

export default getEndIndexOfUniqueCharacterWindow;
