const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define Paths
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// setup static directory to use
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'HTML file',
        name: 'Weather HBS'
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help!!',
        msg: 'For God Sake, please help me!!!',
        name: 'Help Name.'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About this Page',
        name: 'About HBS'
    });
})

app.get('/help/*', (req,res) => {
    res.render('404-page', {
        title: 'Help 404-Page',
        name:'Help Error',
        errorMessage: 'Help article not found'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })

    })

})

app.get('/products', (req,res) => {

    if(!req.query.search){
        return res.send({
            error: 'No search request!'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404-page', {
        title: '404',
        name:'404-Name',
        errorMessage: 'Page Not Found!!'
    });
})

app.get('/help', (req,res) => {
    res.send('Help Page')
})

app.get('/about', (req,res) => {
    res.send('<h1>About the Page</h1>')
})

app.listen(3000, ()=>{
    console.log('Server started at port 3000')
})