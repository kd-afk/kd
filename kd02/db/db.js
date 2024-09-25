const sql = require('mssql');

const dbConfig = {
    user: "sa",
    password: "1234",
    server: "DESKTOP-MH6UJ27",
    database: "kuldeep",
    options: {
      trustServerCertificate: true,
    },
  };


// Connect to the database
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MS SQL Database');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed! Bad Config:', err);
        throw err;
    });

module.exports = {
    sql, poolPromise
};
