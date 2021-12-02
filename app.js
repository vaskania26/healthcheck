const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const uri = 'https://yesno.wtf/api';

app.get('/healthz', async (req, res) => {
  try {
    const response = await axios.head(uri);
    res.sendStatus(response.status);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/random', async (req, res) => {
  try {
    const response = await axios(uri);
    const { answer } = response.data;
    if (answer === 'yes') {
      return res.send({
        result: true,
      });
    }
    return answer === 'no' ? res.send({ result: false }) : res.sendStatus(500);
  } catch (err) {
    res.sendStatus(500);
  }
  return res.end();
});

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

const shutdown = () => {
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);

process.on('SIGTERM', shutdown);
