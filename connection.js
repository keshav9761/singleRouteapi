const mySql = require('mysql2')

const db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Demo',
    connectionLimit: "10"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', JSON.stringify(err, undefined, 2));
        return;
    }
    console.log('Connected to MySQL database');
});

// db.query('SELECT * FROM todolist', (err, results) => {
//     if (err) {
//         console.error('Error executing query:', err);
//         return;
//     }
//     console.log('Query results>>:', results);
// });

// db.end((err) => {
//     if (err) {
//         console.error('Error closing connection:', err);
//         return;
//     }
//     console.log('Connection closed');
// });

module.exports = db
