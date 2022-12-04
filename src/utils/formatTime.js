import convertMilliseconds from "./convertMilliseconds.js";

/**
 * @author 5antos#4876
 * @param {object} time Object returned from the convertMilliseconds function or equivalent
 * @param {string} [format="dd:hh:mm:ss"] Format to display
 * @returns {string} Formatted string
 */

function formatTime(ms, format = "dd:hh:mm:ss") {
  const time = convertMilliseconds(ms);
  const formats = { dd: "days", hh: "hours", mm: "minutes", ss: "seconds" };

  const newFormat = format
    .replace(/dd|hh|mm|ss/g, (match) => time[formats[match]].toString().padStart(2, "0"))
    .replace(/^(00:)+/g, "");

  return newFormat.length > 2 ? newFormat : "00:00:" + newFormat;
}

export default formatTime;
