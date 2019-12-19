const mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'root',
    database: 'fefom_db',
    multipleStatements: true
})

connection.connect((err)=>{
    if (!err) {
        console.log("connected")
    } else {
        console.log(err, "Connection Failed")
    }
})

module.exports = connection;