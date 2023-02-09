const express = require('express');
const sharp = require('sharp');
const app = express();
const fs = require('fs');

app.use(express.json());

app.get('/api/:dimensions', (req, res) => {
    const dimensions = req.params.dimensions.split('x');
    const width = parseInt(dimensions[0], 10);
    const height = parseInt(dimensions[1], 10);

    fs.readFile('./assets/czarnojan.png', async (data, err) => {
        if (err) {
            res.send('error :(');
        }

        else {
            const resizedImage = await sharp(data)
                .resize(width, height)
                .toBuffer();

            res.set('Content-Type', 'image/jpeg');
            res.send(resizedImage);
        }
    })
})

app.get('/', (req, res) => {
    res.send('<p>Czarnojan API</p>');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Czarnojan listening on port ${port}`);
});