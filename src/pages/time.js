/*
 * Convert a timestamp to a human-readable format.
 * Example: timestamp = 525474942, return = "5 May 2018 at 9:02 AM".
 */
export const prettyDate = (timestamp) => {
  var day = timestamp.getDate();
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'];
  var month = ' ' + months[timestamp.getMonth()];
  var year = ' ' + timestamp.getFullYear();
  var hours = timestamp.getHours();
  var meridiem = hours >= 12 ? 'pm' : 'am';
  hours = (hours % 12 === 0) ? 12 : hours % 12;
  var minutes = timestamp.getMinutes();
  minutes = (minutes < 10) ? ':0' + minutes : ':' + minutes;
  minutes = (minutes === ':00') ? '' : minutes;
  return `${day}${month}${year} at ${hours}${minutes}${meridiem}`;
}
