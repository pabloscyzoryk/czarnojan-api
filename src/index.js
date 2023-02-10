const express = require('express');
const sharp = require('sharp');
const app = express();
const fs = require('fs');

app.use(express.json());

app.get('/api/:api', (req, res) => {
    if (!req.params.api.includes('x') || !req.params.api.length > 3) {
        res.redirect('/');
    }

    const dimensions = req.params.api.split('x');
    const width = parseInt(dimensions[0], 10);
    const height = parseInt(dimensions[1], 10);

    if (isNaN(width) || isNaN(height)) {
        res.redirect('/');
    }

    if (width.length === 0 || height.length === 0) {
        res.redirect('/');
    }

    fs.readFile('./src/assets/czarnojan.png', (err, data) => {
        if (err) {
            res.send('error :(');
            console.log(err);
        } else {
            try {
                sharp(data)
                    .resize(width, height)
                    .toBuffer()
                    .then((resizedImage) => {
                        res.set('Content-Type', 'image/jpeg');
                        res.send(resizedImage);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            catch (err) {
                res.send('Something went wrong. Please check your request and try again');
            }
        }
    });
});

app.get('/', (req, res) => {
    res.send(
        `<h1>Czarnojan API</h1>
     <p><b>Example usage: </b>https://czarnojan-api.cyclic.app/api/1080x768</p><br><br>
     <h2>More funny shit with Czarnojan: </h2><br>
     <a href="https://czarnojan.netlify.app">Czarnojan</a><br>
     <a href="https://czarnojan2.netlify.app">Czarnojan 2</a><br>
     <a href="https://czarnojan-clicker.netlify.app">Czarnojan Clicker</a><br>
     <a href="https://czarnojan3d.netlify.app">Czarnojan 3D</a><br>`
    )
});

app.get('*', (req, res) => {
    res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Czarnojan listening on port ${port}`);
});