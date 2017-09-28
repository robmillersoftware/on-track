/**
 * If given a number, returns a string presenting that number presented as U.S.
 * dollars. If not given a number, returns '$0.00'.
 *
 * @param val - A number to present as U.S. dollars.
 * @return {string} - A representation of the number in U.S. dollars.
 */

const toDollars = (val) => {
  let str = '$0.00';
  if (!isNaN(val)) {
    // This function is passed to replace, below, in order to group numbers in
    // sets of three with commas.
    //   c: The matched substring
    //   i: The offset within the string where the matched substring was found.
    //   a: The original string (that is, the number value, rendered to a fixed
    //      precision of two decimal places).
    // So, if the substring is not found at the 0th position, and is not the
    // decimal point, and the substring was found at a position that's a multi-
    // ple of three, we replace the substring with a comma before it. This will
    // insert commas to group the digits of the number by threes.
    const group = (c, i, a) => i && c !== '.' &&
      ((a.length - i) % 3 === 0) ? `,${c}` : c;
    str = val.toFixed(2).replace(/./g, group);
    str = `$${str}`;
  }
  return str;
};

/**
 * Attempts to parse a string representing a U.S. dollar value to a float. The
 * dollar sign and any commas are removed, and then the string is passed to
 * JavaScript's parseFloat function.
 *
 * @param str - A string representing a U.S. dollar value.
 * @return {number} - The float value of the U.S. dollar value represented by
 *   the string. May return NaN if given a bad string.
 */

const parseCurrency = (str) => {
  let val = 0;
  if (str) {
    let stripped = str.replace(/\$/g, '');
    stripped = stripped.replace(/\,/g, '');
    val = parseFloat(stripped);
  }
  return val;
};

export {
  toDollars,
  parseCurrency
};
