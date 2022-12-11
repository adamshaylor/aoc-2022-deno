import type { Directory } from './types.ts';

import sum from '../../lib/sum.ts';

export const getSizeOfFilesInDirectory = (directory: Directory): number =>
  sum(Object.values(directory.files).map(file =>
    file.size
  ));

export const getTotalSizeOfDirectory = (directory: Directory): number => {
  const sizeOfFilesInDirectory = getSizeOfFilesInDirectory(directory);
  const childDirectories = Object.values(directory.children);
  const sizeOfChildDirectories = sum(childDirectories.map(getTotalSizeOfDirectory));
  return sizeOfFilesInDirectory + sizeOfChildDirectories;
};

export const forEachDirectory = (
  directory: Directory,
  parentPath: string[],
  callback: (
    directory: Directory,
    directoryPath: string[]
  ) => void
): void => {
  const directoryPath = parentPath.concat(directory.name);
  callback(directory, directoryPath);
  Object.values(directory.children).forEach(childDirectory =>
    forEachDirectory(childDirectory, directoryPath, callback)
  );
};

export const getPathsToSizes = (root: Directory): Record<string, number> => {
  const pathsToSizes: Record<string, number> = {};
  forEachDirectory(root, [], (directory, directoryPath) => {
    const pathString = directoryPath[0] + directoryPath.slice(1).join('/');
    pathsToSizes[pathString] = getTotalSizeOfDirectory(directory);
  });
  return pathsToSizes;
};

export const createEmptyRoot = (): Directory => ({
  name: '/',
  files: {},
  children: {}
});
