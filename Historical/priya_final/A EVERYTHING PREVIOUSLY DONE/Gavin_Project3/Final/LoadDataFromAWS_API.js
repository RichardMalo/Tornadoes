const { Pool } = require('pg');

// Set up a connection pool
const pool = new Pool({
  host: 'database-2.cjrkxejkebqc.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'tornadoes_db',
  user: 'postgres',
  password: 'project3',
});

// Connect to the database and execute a query
pool.connect()
  .then(client => {
    client.query('SELECT * FROM tornadoes_table')
      .then(result => {
        console.log(result.rows);
        client.release();
        pool.end();
      })
      .catch(e => {
        console.error(e.stack);
        client.release();
        pool.end();
      });
  })
  .catch(e => console.error(e.stack));
