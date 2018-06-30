const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    port: 3306,
    database: 'ecast',
    // host: 'mysql.apiecast.kinghost.net',
    // user: 'apiecast',
    // password: 'laas2811',
    // database: 'apiecast'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Conectado ao BD!");
});

const db = {
    execSQL(sql) {
        return new Promise(
            (resolve, reject) => {
                con.query(sql, function (err, results, fields) {
                    if (err) reject(err);
                    resolve(results);
                })
            }
        )
    }
}

module.exports = db;