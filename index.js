require('dotenv/config');
const express = require('express')
const cors = require('cors')
const connectDatabase = require('./src/database')
const apiRoute = require('./src/api')
const fs = require('fs');
const staticAuthenticateToken = require('./src/api/middlewares/staticAuth');
const port = process.env.PORT || 8080
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: 100000 }));

app.use('/files',[staticAuthenticateToken] ,express.static('./files'));

app.use('/video/:filename', (req, res, next) => {

    const range = req.headers.range;
    if (!range) {
        return res.status(400).send("Requires Range header");
    }

    const videoPath = "./files/videos/" + req.params.filename;

    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);

})


app.use('/api', apiRoute)

app.listen(port, () => {
    console.log(`quick-client running on ${port}`);
    connectDatabase().then(() => console.log(`quick-client database connected`)).catch(() => console.log(`quick-client database connection failed`))
})