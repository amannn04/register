// backend: Express.js (server.js)
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
  user: 'username',
  password: 'password',
  server: 'servername',
  database: 'dbname',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Get all users
app.get('/users', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM Users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  const { FirstName, LastName, username, Age, Address, UserPassword } = req.body;
  try {
    await sql.connect(dbConfig);
    await sql.query(
      `INSERT INTO Users (FirstName, LastName, username, Age, Address, UserPassword)
      VALUES ('${FirstName}', '${LastName}', '${username}', ${Age}, '${Address}', '${UserPassword}')`
    );
    res.send('User added successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
