/**
 * Truncates a string to a maximum length and adds ellipsis if truncated
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length of the string
 * @returns {string} The truncated string
 */
export const truncate = (text, maxLength) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};
