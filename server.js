const express= require('express');
const bodyParser=require('body-parser');
const app=express();
const port =  process.env.PORT || 5000;

app.use(bodyParser.json()); // jason 으로 주고 받음
app.use(bodyParser.urlencoded({extended:true}));

// app.get('/api/hello',(req,res)=>{
//     res.send({message:'Hello Express! Concurrently'});
// });
app.get('/api/customers',(req,res)=>{
    res.send([
        {
        'id':1,
        'image': 'https://placeimg.com/64/64/1',
        'name': ' jckim',
        'birthday':'9761221',
        'gender':'man',
        'job':'bisiness'
      },
      {
        'id':2,
        'image': 'https://placeimg.com/64/64/2',
        'name': ' thkim',
        'birthday':'9761221',
        'gender':'man',
        'job':'student'
      },
      {
        'id':3,
        'image': 'https://placeimg.com/64/64/3',
        'name': ' bskim',
        'birthday':'9761221',
        'gender':'man',
        'job':'student'
      },      
      ])
})

app.listen(port,()=> console.log(`Listening on port ${port}`));