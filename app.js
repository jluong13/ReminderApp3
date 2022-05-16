const express = require('express');
const path = require('path');
const app = express();

let port = 3000;
 
app.use(express.static(__dirname + '/public'));


app.listen(port, () => {
 console.log("Server listening on port " + port);
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/main.html')
});


   
