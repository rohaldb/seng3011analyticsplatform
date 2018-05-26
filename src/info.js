/*
 * Extract summary of company from section 0 of wiki.
 */
export const extractCompanySummary = (src, length) => {
  var len = 0
  var summary = ''
  src = src.substring(src.indexOf('is'), src.length)
  var components = src.split('.')
  components[0] = components[0].replace(/^[^()]*\)/, '')
  var prev = ''
  var i = 0

  while (len < length) {
    if (!components[i]) {
      break /* section 0 too short */
    } else if (i > 0 && len + components[i].length + 1 >= length && !components[i].match(/^[\s\n]/)) {
      break /* avoid mid-sentence cut-off */
    }
    prev = summary
    summary += components[i] + '.'
    len = summary.length
    i++
  }

  if (i > 2 && components[i] && !components[i].match(/^[\s\n]/)) {
    /* avoid mid-sentence cut-off */
    if (!prev.match(/[0-9]\.$/) && !components[i - 1].match(/^[0-9]/)) {
      /* but avoid if last component was the end of a number */
      summary = prev
    }
  } else if (components[i] && !components[i].match(/\s/)) {
    summary += components[i] + '.' /* add single trailing word */
  }

  return summary.replace(/[\s.]+$/, '.')
}
