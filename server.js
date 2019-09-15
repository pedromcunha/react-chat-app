const chatRoomData = require('./data.json')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

//Set Static Assets

app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => res.sendFile(__dirname +  '/build/index.html'))

app.get('/chatRoom', (req, res) => {
  res.send(chatRoomData)
})

app.post('/chat', (req, res) => {
  if (!req.body.comment) {
    res.status(422).send()
    return
  }
  
  res.status(200).send()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
