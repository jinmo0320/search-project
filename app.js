const express = require('express');
const app = express();
var suggest = require('suggestion');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  suggest(`${req.body.keyword}`, (err, suggestions) => {
    if (err) throw err;
    res.json(suggestions);
  });
});

app.post('/search_process', (req, res) => {
  if (req.body.value !== '') {
    res.redirect(`https://www.google.com/search?q=${req.body.value}`);
  } else {
    res.redirect(`/`);
  }
});

app.listen(3000, () => {
  console.log('app listen on port 3000');
});
