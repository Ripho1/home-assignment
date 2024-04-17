import { UserData } from "./types";

const _usedIDs:Set<number> = new Set();

/**
 * Returning a random user whose id was yet used
 * 
 * @param users Users from which to get a random user
 * @returns Random user or undefined
 */
export function chooseRandomUser(users: UserData[]): UserData | undefined {
  const ids = users.map(user => user.id);
  let selectedID: number = -1;

  while (selectedID === -1) {
    const random = Math.random();
    const randomIndex = Math.floor(random * ids.length);
    const randomID = ids[randomIndex];
  
    // Need to reset the _usedIDs because all ids were used
    if (randomID === undefined) {
      ids.push(...users.map(user => user.id));
      _usedIDs.clear();
    } else {
      // Checking if the id was already used or not
      if (_usedIDs.has(randomID)) {
        ids.splice(randomIndex, 1);
      } else {
        _usedIDs.add(randomID);
  
        selectedID = randomID;
      }
    }

  }

  return users.find(user => user.id === selectedID);
}

/**
 * @param dateString Date in a UTC string format
 * @returns Date string in a readable format
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    
    return date.toLocaleString();
  } catch (error) {
    // Time conversion error handling should go here
    return "";
  }
}