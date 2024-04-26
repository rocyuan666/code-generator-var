/**
 * 判断url是否是http或https
 * @param {string} url
 * @returns {Boolean}
 */
function isHttpOrHttps(url) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}

module.exports = {
  isHttpOrHttps,
}
