const express = require('express');
const app = express();
const port = process.env.PORT || 8980;

const baseHTML = content => (
  `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Simple form</title>
    </head>
    <body>
      ${content}
    </body>
  </html>`);

const successHTML = ({name, password}) => (
  `<h1>Bingo! Credentials are right!</h1>
  <p>name: ${name}<br />password: ${password}</p>`
);

const formHTML = ({name, password, nameValid, passwordValid}) => (
  `<form action="/service" method="get">
    <input type="text" placeholder="Name" name="name" ${!nameValid && 'style="border-color: red"'} value="${name}" />
    <br />
    <input type="password" placeholder="Password" name="password" ${!passwordValid && 'style="border-color: red"'} value="${password}" />
    <br />
    <button>submit</button>
  </form>`
);

app.get('/', (req, res) => {
  const html = formHTML({
    name: '',
    password: '',
    nameValid: true,
    passwordValid: true,
  });
  res.send(baseHTML(html));
});

app.get('/service', (req, res) => {
  const name = req.query.name || '';
  const password = req.query.password  || '';
  const isNameValid = name === 'alex';
  const isPasswordValid = password === '123';
  let html;

  if (isNameValid && isPasswordValid) {
    html = successHTML({name, password});
  } else {
    html = formHTML({
      name,
      password,
      nameValid: isNameValid,
      passwordValid: isPasswordValid,
    });
  }
  res.send(baseHTML(html));
});

app.listen(port, () => console.log(`listening on port ${port}`));
