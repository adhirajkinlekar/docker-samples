const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, this is the home service!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
