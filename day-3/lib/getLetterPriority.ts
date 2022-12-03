const getLetterPriority = (letter: string): number => {
  const lowerAPriority = 1;
  const lowerACharCode = 'a'.charCodeAt(0);
  const upperAPriority = 27;
  const upperACharCode = 'A'.charCodeAt(0);
  const letterRegExp = /^[A-Za-z]$/;

  if (!letterRegExp.test(letter)) {
    throw new TypeError(`Expected letter argument to be a single character, a-z or A-Z. Found ${ letter }.`);
  }

  const letterCharCode = letter.charCodeAt(0);
  const lowercaseRegExp = /^[a-z]$/;

  if (lowercaseRegExp.test(letter)) {
    return letterCharCode - lowerACharCode + lowerAPriority;
  }

  return letterCharCode - upperACharCode + upperAPriority;
}

export default getLetterPriority;
