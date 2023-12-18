
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const mysql2 = require('mysql2');

const app = express();
const port = 3001;

const cors = require('cors')
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cardboard'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Express 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 사용자 정보 저장 API
app.post('/', (req, res) => {
  const { name, job_title, phone_number, email } = req.body;
  const sql = `INSERT INTO userinfo (name, job_title, phone_number, email) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, job_title, phone_number, email], (err, result) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Internal Server Error');
      } else {
          res.status(200).send('User created successfully');
      }
  });
});

// 사용자 목록 조회 API
app.get('/', (req, res) => {
  const sql = `SELECT * FROM userinfo`;
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Internal Server Error');
      } else {
          res.send(result);
      }
  });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});