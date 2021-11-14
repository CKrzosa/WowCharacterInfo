const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
app.use(express.static('views'))

app.use(express.urlencoded({ extended: true }));

app.use(express.json())


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('indexStart')

})
app.get('/no', (req, res) => {
    res.render('noPlayer')

})

app.post('/main', (req, res) => {
    res.render('index', {
        nick: req.body.nick,
        server: req.body.serverName
    });
})


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})