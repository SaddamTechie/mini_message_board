const express = require('express')
const path = require('node:path')
require('dotenv').config()

const PORT = process.env.PORT
const app = express()

app.use(express.static('public'))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));


const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
  

app.get('/',(req,res)=>{
    res.render('index',{title:'Mini Message Board',messages:messages})
})

app.get('/new',(req,res)=>{
    res.render('form')
})

app.get('/message/:messageUser',(req,res)=>{
    let user = req.params.messageUser
    const message = messages.find(i => i.user === user);

    if(message){
        res.render('messages/message',{message:message})
    }else{
        res.status(404).send('Message Not Found')
    }

})

app.post('/new',(req,res)=>{
    const messageText = req.body.messageText
    const messageUser = req.body.messageUser
    messages.push({text:messageText,user:messageUser,added:new Date()})
    res.redirect('/')
})


app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})