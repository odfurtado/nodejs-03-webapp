const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();

  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome'
    });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request!'
  });
});

app.listen(3000, () => {
  console.log('Service is up on port 3000');
});
