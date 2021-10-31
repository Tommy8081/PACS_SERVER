import mysql from 'mysql';
import dbConfig from './db';
// 连接数据库
const db = mysql.createConnection(dbConfig);
db.connect(err => {
  if (err) throw err;
  console.log("数据库连接成功");
});
const pool = mysql.createPool(dbConfig);

const query = (sql: string) => {
  return new Promise<any>((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
          connection.release(); // 释放该链接，把该链接放回池里供其他人使用
        });
      }
    });
  });
};

export default query;
