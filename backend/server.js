const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')


// Routes

const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')



// APP
const app = express()


//Database  
mongoose.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('DB Connected'))




// MIDDLEWARES

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// cors
if (process.env.NODE_ENV == 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

// Routes Middleware
app.use('/api', blogRoutes)
app.use('/api', authRoutes)


// PORT

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('Server is running at localhost:8000')
})
