const express= require('express');
const bodyParser=require('body-parser');
const app=express();
const port =  process.env.PORT || 5000;
const fs = require('fs');

app.use(bodyParser.json()); // jason format 으로 주고 받음
app.use(bodyParser.urlencoded({extended:true}));

const data=fs.readFileSync('./database.json');
const conf= JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port:conf.port,
  database:conf.database
})

connection.connect();
// app.get('/api/hello',(req,res)=>{
//     res.send({message:'Hello Express! Concurrently'});
// });
app.get('/api/customers',(req,res)=>{
  connection.query(
    "SELECT * FROM CUSTOMER",(err,rows,fields)=> {
      res.send(rows);
      // console.log(rows);
    }
  )

    // res.send([
    //     {
    //     'id':1,
    //     'image': 'https://placeimg.com/64/64/1',
    //     'name': ' jckim',
    //     'birthday':'9761221',
    //     'gender':'man',
    //     'job':'bisiness'
    //   },
    //   {
    //     'id':2,
    //     'image': 'https://placeimg.com/64/64/2',
    //     'name': ' thkim',
    //     'birthday':'9761221',
    //     'gender':'man',
    //     'job':'student'
    //   },
    //   {
    //     'id':3,
    //     'image': 'https://placeimg.com/64/64/3',
    //     'name': ' bskim',
    //     'birthday':'9761221',
    //     'gender':'man',
    //     'job':'engineer'
    //   },      
    //   ])
})

app.listen(port,()=> console.log(`Listening on port ${port}`));