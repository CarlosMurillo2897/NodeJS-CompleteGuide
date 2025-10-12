const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // Middleware to parse the body of incoming requests.

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Add Product</button></form>'); // Send a response to the client.
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); // Redirect to another route.
});

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>'); // Send a response to the client.
});

app.listen(3000);