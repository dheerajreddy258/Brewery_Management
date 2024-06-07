const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
const allowedOrigins = ['http://localhost:3000','https://kanteen-ase.netlify.app']
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json())

// Use the appropriate module for the protocol
const keepAlive = () => {
    const url = new URL(process.env.SERVER_URL);
    const protocol = url.protocol === 'https:' ? https : http;
    protocol.get(process.env.SERVER_URL);
};

setInterval(keepAlive, 300000);
const http = require('http');
const server = http.createServer(app);


const connectDB = require('./db');
connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch(err => {
    console.log(err);
    console.log('Error connecting to database');
})

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const reviewRouter = require('./routes/review')
app.use('/api/review',reviewRouter);