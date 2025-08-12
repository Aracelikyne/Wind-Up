/**
 * Gets and parses an item from localStorage.
 * @param {string} key The key of the item to retrieve.
 * @returns {any} The parsed data from localStorage.
 */
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  /**
   * Stringifies and saves an item to localStorage.
   * @param {string} key The key of the item to save.
   * @param {any} data The data to save.
   */
  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }