const express = require('express')
const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }));

app.use(express.json())


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('indexStart')
})

app.post('/main', (req, res) => {

    res.render('index', console.log({ nick: req.body }));

})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})