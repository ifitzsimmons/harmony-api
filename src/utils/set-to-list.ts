/**
 * Converts a set to a list.
 *
 * @param set A set of any type
 * @returns A list of the same type
 */
export const setToList = <T>(set: Set<T>): T[] => Array.from(set);
