const router = require('express').Router();   

// const User = mongoose.model('User');
// const mongoose = require('mongoose');

// const passport = require('passport');
// const utils = require('../lib/utils');

router.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
  };

  // getting approval url from payment.links and redirecting to approval url
  // approval url is paypals external url which lets you pay from users own paypal account
  // this does not create the payment but it opens paypal approval url for user to authorize the payment 
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        // console.log(payment) // this can be done to see payment
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
});


// this is redirected path if payment was successful 
router.get('/success', (req, res) => {
  const payerId = req.query.PayerID; // is supplied by paypals approval url if payment successfull
  const paymentId = req.query.paymentId; // is supplied by paypals approval url if payment successfull

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "25.00"
        }
    }]
  };

  // this executes the payment finally
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
  });
});



router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;