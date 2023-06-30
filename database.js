const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuariosdatos'
});

connection.connect((err) => {
    if (err){
        throw err;
    }
    console.log('La base de datos esta conectada!');
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//Creacion de base de datos
app.get('/createdb', (req,res) =>{
    let sql = 'CREATE DATABASE usuariosdatos';
    connection.query(sql,(err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send('Base de datos creada')
    });
});

//Crear tabla

app.get('/creartabla', (req, res) => {
    let sql = 'CREATE TABLE datos(id int AUTO_INCREMENT, nomape VARCHAR(255), email VARCHAR(255), mensaje VARCHAR (100), PRIMARY KEY(id))';
    connection.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send('Tabla creada')
    })
})


app.post('/insert', (req, res) => {
    const { nomape, email, mensaje } = req.body;
  
    const sql = `INSERT INTO users (nomape, email, mensaje) VALUES ('${nomape}', '${email}', '${mensaje}')`;
  
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log('Data inserted successfully!');
      res.send('Data inserted successfully!');
    });
  });
  
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });