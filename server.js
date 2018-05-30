const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {

    //res.send('<h1>Hello, you express!</h1>');
    res.send({
        name: 'cats',
        color: 'green',
        eats: [
            'fish',
            'cans',
            'things'
        ]
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs')
});

app.get('/profile', (req, res) => {
    res.send("My Profile it is.")
});

app.get('/bad', function(request, response) {
    errorMsg = {
        type: 'Error',
        message: 'Unable fulfill request !'
    };
    response.send(errorMsg);
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});