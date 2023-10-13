/**
 * 蛇形命名转换大小驼峰命名处理
 * @param {String} snakeName - 蛇形名
 * @param {Boolean} isBig - 是否大驼峰
 * @returns
 */
export function snakeFormatHump(snakeName, isBig = false) {
  let humpName = ''
  const snakeNames = snakeName.split('_')
  snakeNames.forEach((snakeSplit, index) => {
    if (isBig || index > 0) {
      snakeSplit = snakeSplit[0].toUpperCase() + snakeSplit.substring(1)
    }
    humpName += snakeSplit
  })
  return humpName
}
