const express = require('express');

// file system for file I/O
const fs = require('fs');

// for receiving JSON from a POST request
const bodyParser = require('body-parser');

const app = express();

// tell the app to accept JSON
app.use(bodyParser.json());

app.get('/hello', function(request, response, next) {
  return response.send('hello Rithm');
});

app.get('/hello/:name', function(request, response, next) {
  const name = request.params.name;
  const item = request.query.item; // query string with keys and values

  let message = `hello ${name}.`;

  if (item) {
    message += ` Here is an item for you: ${item}`;
  }

  return response.send(message);
});

/**
 * The below example writes to a file like you would to a database.
 *  You must POST JSOn to it.
 */
app.post('/users', function(request, response, next) {
  // we need to pass a string to write to the file
  const strForFile = JSON.stringify(request.body);

  fs.appendFile('./users.txt', strForFile, function(err) {
    if (err) {
      // pass errors to next
      return next(err);
    }
    return response.json({ success: true, content: request.body });
  });
});

/**
 * The below example reads from a file that we may have previously written to
 */
app.get('/users', function(request, response, next) {
  // we need to pass a string to write to the file

  fs.readFile('./users.txt', 'utf8', function(err, data) {
    if (err) {
      // pass errors to next
      return next(err);
    }
    return response.json({ fileContents: data });
  });
});

/**
 * An example error handler
 */
app.use(function(error, request, response, next) {
  let errObj = { error: error.message };
  if (!error.message) {
    errObj.error = 'Oops. Internal Server Error';
  }
  return response.json(errObj);
});

app.listen(3000, function() {
  console.log('Express app is listening on port 3000...');
});
