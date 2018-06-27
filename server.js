const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.ip}: ${req.url}`;
    console.log(log);
    fs.appendFile('app.log', log + '\n', (err) => {
        if (err) {
            console.log("General failure in logging module.");
        }
    })
    next();
});

/*
app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: "Maintenance windows",
    });
});
*/
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello, you express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        heading: 'Home page',
        welcomeMessage: 'Welcome to my lorem ipsum domain, here i am lorem and you are ipsum, so watch it !',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Some title',
        heading: 'About all the living things and the mouses',
        h_txt: 'This is a new way to present my cooking manners - by stairing at you and thinking, thinking...',
    })
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

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});