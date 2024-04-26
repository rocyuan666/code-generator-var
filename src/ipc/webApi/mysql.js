const mysql2 = require('mysql2')

// mysql 连接池对象
let poolPromise
let pool

/**
 * 连接 mysql
 * @param {*} event
 * @param {*} connData
 * @returns
 */
function connectMysql(event, connData) {
  return new Promise((resolve, reject) => {
    const option = JSON.parse(connData)
    const _pool = mysql2.createPool({
      ...option,
    })
    _pool.getConnection((err, conn) => {
      if (err) {
        reject(err)
      } else {
        resolve('mysql连接成功')
      }
    })
    pool = _pool
    poolPromise = _pool.promise()
  })
}

/**
 * 结束连接mysql
 */
function connectMysqlEnd() {
  return new Promise((resolve, reject) => {
    pool.end((err) => {
      if (err) {
        reject(err)
      } else {
        resolve('mysql连接成功')
      }
    })
  })
}

/**
 * 根据数据库名获取所有表信息
 * @param {*} event
 * @param {String} databaseName
 * @returns
 */
async function getTables(event, databaseName) {
  const sql = 'SELECT * FROM `information_schema`.`tables` WHERE TABLE_SCHEMA = ?'
  const result = await poolPromise.execute(sql, [databaseName])
  return result[0]
}

/**
 * 根据表名获取字段信息
 * @param {*} event
 * @param {String} tableName
 * @returns
 */
async function getFields(event, databaseName, tableName) {
  const sql =
    'SELECT * FROM `information_schema`.`columns` WHERE TABLE_SCHEMA = ? AND table_name = ? ORDER BY ORDINAL_POSITION ASC'
  const result = await poolPromise.execute(sql, [databaseName, tableName])
  return result[0]
}

module.exports = {
  pool,
  poolPromise,
  connectMysql,
  connectMysqlEnd,
  getTables,
  getFields,
}
