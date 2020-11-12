require('dotenv').config();
const createError = require('http-errors');
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const statusesRouter = require('./routes/statuses');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const orderDetailsRouter = require('./routes/orderdetails');
const cartsRouter = require('./routes/carts');
const cartDetailsRouter = require('./routes/cartdetails');
const imagesRouter = require('./routes/images');
const reviewsRouter = require('./routes/reviews');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/categories', categoriesRouter);
app.use('/statuses', statusesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/order-details', orderDetailsRouter);
app.use('/carts', cartsRouter);
app.use('/cart-details', cartDetailsRouter);
app.use('/images', imagesRouter);
app.use('/reviews', reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
