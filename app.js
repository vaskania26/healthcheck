const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const uri = 'https://yesno.wtf/api';

app.get('/healthcheck', (req, res) => {
  axios
    .head(uri)
    .then((response) => response.status)
    .then((data) => res.sendStatus(data))
    .catch((error) => res.sendStatus(500));
});

app.get('/random', (req, res) => {
  axios(uri)
    .then((response) => response.data.answer)
    .then((data) => {
      if (data === 'yes') {
        res.send({
          result: true,
        });
      } else if (data === 'no') {
        res.send({
          result: false,
        });
      } else {
        res.sendStatus(500);
      }
    })
    .catch((error) => console.log(error.response.statusText));
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', () => {
  shutdown();
});

process.on('SIGTERM', () => {
  shutdown();
});

const shutdown = () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
};
