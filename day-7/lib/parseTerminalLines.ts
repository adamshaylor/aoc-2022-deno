import type { Directory, File } from './types.ts';

type CommandCd = `$ cd ${ string }`
type CommandLs = '$ ls'
type Command = CommandCd | CommandLs

type ListingDir = `dir ${ string }`
type ListingFile = `${ number } ${ string }`
type Listing = ListingDir | ListingFile

export type TerminalLine = Command | Listing

const isCommand = (terminalLine: string): terminalLine is Command =>
  terminalLine.startsWith('$ ');

const isListing = (terminalLine: string): terminalLine is Listing =>
  !isCommand(terminalLine);

const getDirectoryAtPath = (currentDirectory: Directory, path: string[]): Directory | undefined => {
  const [ childName, ...remainingDescendentNames ] = path;

  if (!childName) {
    return currentDirectory;
  }

  const childDirectory = currentDirectory.children[childName];
  
  if (!childDirectory) {
    return undefined;
  }

  return getDirectoryAtPath(childDirectory, remainingDescendentNames);
};

const requireDirectoryAtPath = (context: Directory, path: string[]): Directory => {
  const directoryAtPath = getDirectoryAtPath(context, path);
  if (!directoryAtPath) {
    throw new Error(`No such directory ${ path.join('/') } in ${ context.name }`);
  }
  return directoryAtPath;
}

/**
 * @returns updated path
 */
const parseCommand = (
  root: Directory,
  path: string[],
  command: Command,
  console?: Console
): string[] => {
  if (command === '$ ls') {
    // Given that we can parse directory and file listings independent
    // of the `ls` command itself, we can safely ignore it.
    console?.log('Ignoring "ls" command');
    return path;
  }

  const directoryName = command.replace(/^\$ cd /, '');
  const context = requireDirectoryAtPath(root, path);
  console?.log(`Parsed directory as "${ directoryName }" in "${ command }"`);
  if (directoryName === '..') {
    console?.log(`Changing path from ${ path.join('/') } to ${ path.slice(0, -1) }`);
    return path.slice(0, -1);
  }
  else if (context.children[directoryName]) {
    console?.log(`Changing path from ${ path.join('/') } to ${ [ ...path, directoryName ] }`);
    return [ ...path, directoryName ];
  }
  else {
    // We could just add it, but the input text consistently lists
    // directories before `cd`-ing into them.
    throw new Error(`No such directory ${ directoryName }`);
  }
};

/**
 * Immutably adds a `Directory` or `File` to the specified path.
 * 
 * @returns an updated context `Directory` tree with `newEntry`
 * added to the specified `path`.
 */
const appendToDirectory = (
  context: Directory,
  path: string[],
  newEntry: Directory | File,
  console?: Console
): Directory => {
  console?.log(`appendToDirectory(${ context.name }, ${ path.join('/') }, ${ newEntry.name })`);
  const [ nextChildName, ...remainingDescendentNames ] = path;
  
  // There is no `path` to descend; add `newEntry` directly to
  // `context`.
  if (!nextChildName) {
    if ('children' in newEntry) {
      // `newEntry` is a `Directory`
      console?.log(`Adding directory ${ newEntry.name } to children of ${ context.name }`);
      return {
        ...context,
        children: {
          ...context.children,
          [newEntry.name]: newEntry
        }
      };
    }
    else {
      // `newEntry` is a `File`
      console?.log(`Adding file ${ newEntry.name } to files in ${ context.name }`);
      return {
        ...context,
        files: {
          ...context.files,
          [newEntry.name]: newEntry
        }
      };
    }
  }

  // Recursively construct a new `Directory` tree that's the same as
  // `context` but with the addition of `newEntry` at `path`.
  return {
    ...context,
    children: {
      ...context.children,
      [nextChildName]: appendToDirectory(context.children[nextChildName], remainingDescendentNames, newEntry)
    }
  };
};

/**
 * @returns updated root directory
 */
const parseListing = (
  root: Directory,
  path: string[],
  listing: Listing,
  console?: Console
): Directory => {
  console?.log(`parseListing(${ root.name }, ${ path.join('/') }, "${ listing }")`);

  const dirListingPrefixRegExp = /^dir /;
  if (dirListingPrefixRegExp.test(listing)) {
    console?.log(`listing "${ listing }" is a directory`);
    const directoryName = listing.replace(dirListingPrefixRegExp, '');
    const newDirectory: Directory = {
      name: directoryName,
      files: {},
      children: {}
    };
    return appendToDirectory(root, path, newDirectory, console);
  }

  // Assume at this point that `listing` is a `ListingFile`. Also
  // assume there are no spaces in the file name.
  console?.log(`listing "${ listing }" is a file`);
  const [ sizeString, fileName ] = listing.split(' ');
  const size = Number(sizeString);

  if (isNaN(size)) {
    throw new Error(`Interpreted "${ listing }" as a file listing starting with a size number, but "${ sizeString }" does not appear to be a number`);
  }

  const newFile: File = {
    name: fileName,
    size
  };

  return appendToDirectory(root, path, newFile, console);
};

export const parseTerminalLines = (
  root: Directory,
  currentPath: string[],
  terminalLines: TerminalLine[],
  console?: Console
): Directory => {
  const [ currentLine, ...remainingLines ] = terminalLines;

  if (!currentLine) {
    return root;
  }

  if (isCommand(currentLine)) {
    console?.log(`"${ currentLine }" is a command`);
    const updatedPath = parseCommand(root, currentPath, currentLine, console);
    console?.log('updatedPath: ' + updatedPath.join('/'));
    return parseTerminalLines(root, updatedPath, remainingLines, console);
  }

  if (isListing(currentLine)) {
    console?.log(`"${ currentLine }" is a listing`);
    const updatedRoot = parseListing(root, currentPath, currentLine, console);
    return parseTerminalLines(updatedRoot, currentPath, remainingLines, console);
  }

  throw new Error(`Unexpected terminal line: "${ currentLine }"`);
};
