/* eslint-disable no-tabs */
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app'); // Passing app will include app on all debug messages
const morgan = require('morgan'); // Log webtraffic messages
const path = require('path'); // This manages paths so no need to use slashes in dir names

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('combined')); // combined is the setting, could be 'tiny'
app.use(express.static(path.join(__dirname, '/public'))); // this lets node know that we'll be using static files for css and js. Anything in public will be accessible to the world
app.use(express.static(path.join(__dirname, '/node_modules/'))); // path.join will take all arguments and form a good path; __dirname gives current path of executabel
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/dist', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs'); // This enables EJS templating

const nav = [
  { link: '/books', title: 'Book' }, // Here we are passing objects.
  { link: '/authors', title: 'Author' }];

const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);


app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav,
      title: 'Library',
    },
  ); // This renders the index view and passes an array for list and a title variable
});

app.listen(port, () => {
  debug(`listening at port ${chalk.green(port)}`); // ES6 use backticks and ${} to insert
});
