const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup HBS engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

//app.get() allows us to configure what the server should do when someone gets a resource at a specific URL
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Steve G'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Steve G'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page.',
        name: 'Steve G'
    })
})

//res.send() sends data back to the requester to render a page; this acts as the client-side API endpoint.
app.get('/weather', (req, res) => {
    const query = req.query
    if (!query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, data) => {
            if (error) {
            return res.send({
                error: error
                })
            }

            res.send({
                forecast: data,
                location: location,
                address: query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Steve G',
        errorMessage: 'Help article not found.'
    })
})

app.get('/products', (req, res) => {
    const query = req.query
    if (!query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

//Match anything that hasn't been matched so far
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Steve G',
        errorMessage: 'Page not found.'
    })
})

//Starts up server
app.listen(port, () => {
    console.log(`Starting server on port ${port}.`)
})