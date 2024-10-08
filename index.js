const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(express.json());
app.use(cors());

app.use('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  cartTotal = cartTotal + newItemPrice;

  res.send(cartTotal.toString());
});

app.use('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let result;

  if (isMember) {
    result = cartTotal - cartTotal * (10 / 100);
  } else {
    result = 'Your not eligible for discount';
  }

  res.send(result.toString());
});

app.use('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  let result = cartTotal * (5 / 100);

  res.send(result.toString());
});

app.use('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  let result;

  if (shippingMethod === 'express') {
    result = distance / 100;
  } else {
    result = distance / 50;
  }

  res.send(result.toString());
});

app.use('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let result = weight * distance * 0.1;

  res.send(result.toString());
});

app.use('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  let result = purchaseAmount * 2;

  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
