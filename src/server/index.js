
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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
//app.use(express.json());
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

app.put('/card/:id', (req,res) => {
    const userId = req.params.id;
    const sql = "UPDATE userinfo SET `name` = ?, `job_title` = ?, `phone_number` = ?, `email` = ?";
    const values = [
        req.body.name,
        req.body.job_title,
        req.body.phone_number,
        req.body.email,
    ];
    db.query(sql, [...values, userId], (err,result) => {
        if(err) return res.send(err);
        return res.json(result);
    });
});

app.delete('/card/:id', (req,res) => {
    const sql = "DELETE FROM userinfo WHERE ID = ?";
    // const values = [
    //     req.body.name,
    //     req.body.job_title,
    //     req.body.phone_number,
    //     req.body.email
    // ]
    const id = req.params.id;
    db.query(sql, [id], (err,result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});