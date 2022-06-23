const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const { log } = require('console');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Make sure fields are filled
  if (!firstName || !lastName || !email) {
    res.redirect('/fail.html');
    return;
  }

  //   Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const postData = JSON.stringify(data);

  const options = {
    url: 'https://us14.api.mailchimp.com/3.0/lists/79b657924a',
    method: 'POST',
    headers: {
      Authorization: 'auth 84a54d76b55244390536fed28f6e3609-us14',
    },
    body: postData,
  };

  request(options, (err, response, body) => {
    if (err) {
      res.redirect('.fail.html');
    } else {
      if (response.statusCode === 200) {
        res.redirect('/success.html');
      } else {
        res.redirect('.fail.html');
      }
    }
  });
});

port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server started on port 3000');
});
