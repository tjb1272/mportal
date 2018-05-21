const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const flash = require('connect-flash');
const session = require('cookie-session');
const passport = require('passport');
const sqlite = require('sqlite3')
const Sequelize = require('sequelize');

const port = process.env.PORT || 3000;
const app = express();

//Models
const models = require('./models');
const users = require('./routes/users');
const messages = require('./routes/messages');

//Engines
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//BodyParsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Public Directory
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({ secret: 'secret' }));

//Passport Init
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//Flash Connection
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('err');
    next();
});

//Routes
app.use('/users', users);
app.use('/messages', messages);

app.use((req, res) => {
    res.status(400);
    res.render('404');
});

models.sequelize.sync().then(function() {
    app.listen(port, function() {
        console.log('server running on ' + port);
    });
});