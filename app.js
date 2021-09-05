const express = require('express');
const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send('all ok');
});

app.listen(PORT, () => {
  console.log(`App on port ${PORT}`)

})