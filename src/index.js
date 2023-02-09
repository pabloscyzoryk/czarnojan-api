const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<p>Czarnojan API</p>')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Czarnojan listening on port ${port}`);
});