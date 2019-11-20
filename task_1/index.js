const express = require('express');
const app = express();
const port = process.env.PORT || 8980;

app.get('/', (req, res) => {
  const page = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Simple form</title>
    </head>
    <body>
      <form action="/service" method="get">
        <input type="text" placeholder="Name" name="name" />
        <br />
        <input type="password" placeholder="Password" name="password" />
        <br />
        <button>submit</button>
      </form>
    </body>
    </html>
  `;
  res.send(page)
});

app.get('/service', (req, res) => {
  const name = req.query.name;
  const password = req.query.password;
  const isNameValid = name === 'alex';
  const isPasswordValid = password === '123';
  const isValid = isNameValid && isPasswordValid;
  const error = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Simple form</title>
    </head>
    <body>
      <form action="/service" method="get">
        <input type="text" placeholder="Name" name="name" ${!isNameValid && 'style="border-color: red"' } value=${name} />
        <br />
        <input type="password" placeholder="Password" name="password" ${!isPasswordValid && 'style="border-color: red"' } value=${password} />
        <br />
        <button>submit</button>
      </form>
    </body>
    </html>
  `;
  const success = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Simple form</title>
      </head>
      <body>
        <h1>Bingo! Credentials are right!</h1>
        <p>name: ${name}<br />password: ${password}</p>
      </body>
    </html>
    `;
  if (!isValid) {
    res.send(error)  
  }
  res.send(success)
});

app.listen(port, () => console.log(`listening on port ${port}`));
