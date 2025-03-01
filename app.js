require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3600
const cors = require('cors')
const mongoose = require('mongoose')

const loginRouter = require('./routes/loginRoute')
const signupRouter = require('./routes/signupRoute')
const userDataRouter = require('./routes/userDataRoute')

app.get('/', (request, response) => {
    response.send(`<h1>Hello World!</h1> It's working`)
})

const corsOptions = {
  origin: 'https://login-authentication-app-frontend-git-main-d-i-v-y-a-s-projects.vercel.app',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(express.json());

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to DataBase successfully'))

app.use('/api/v1/login',loginRouter)
app.use('/api/v1/signup',signupRouter)
app.use('/api/v1/userdata',userDataRouter)


app.listen(PORT, console.log(`Server running at http://localhost:${PORT}`))
