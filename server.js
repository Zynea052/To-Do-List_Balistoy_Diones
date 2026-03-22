const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // <-- your MySQL username
  password: 'Zynea12345@@', //  
  database: 'todo_db'
});

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected!");
  }
});

// GET all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// ADD a task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err) => {
    if (err) throw err;
    res.json({ message: "Task added!" });
  });
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: "Task deleted!" });
  });
});

// Start server
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

module.exports = app;