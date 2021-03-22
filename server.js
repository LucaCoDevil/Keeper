const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const path = require('path');
const routes = require('./routes/api.js')

const app = express();

const PORT = process.env.PORT || 5000;



//connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/notes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("Database is connected");
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

//HTTP request logger
app.use(morgan('tiny'));

app.use('/', routes);

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
});

app.listen(PORT, (req, res) => {
    console.log(`running on ${PORT}`);
})