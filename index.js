import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import path from 'path';
import webRoutes from './routes/web.route.js'
import usersRoutes from './routes/user.route.js'
import { verifyTokenJWT } from './middlewares/jwt.middleware.js';

const __dirname = import.meta.dirname;

const app = express()
app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend URL
    methods: ['GET', 'POST'],          // Allow only GET and POST requests
    allowedHeaders: ['Content-Type'],  // Allow only specific headers
    credentials: true                  // Allow cookies, authorization headers with credentials
}));
app.use(express.static(path.join(__dirname, '/public')));
//MIDELWARES BODY
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/dashboard',verifyTokenJWT, (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html')
})


app.use('/users', usersRoutes)
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})