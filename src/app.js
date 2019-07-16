const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars
app.set('view engine','hbs') // Setting up handlebars
app.set('views', viewsDirectory)
hbs.registerPartials(partialsPath)

//  Setting up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
  res.render('index',{
    title:'Weather',
    name:'Delwyn'
  })
})

app.get('/about',(req,res) => {
  res.render('about',{
    title: 'About me',
    name:'Delwyn'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help Page',
    name:'Delwyn',
    message:'If you ever need help you can email me at sodelwyn.yit@mail.mcgill.ca'
  })
})



app.get('/weather',(req,res) => {
  if (!req.query.address) {
    return res.send({
      error:'You must provide an address'
    })
  }
  const { address } = req.query
geocode( address, (error,geocodeBody) => {
    if (error) {
      return res.send({ error })
    }
    const { latitude, longitude, location } = geocodeBody
    return forecast(latitude,longitude, (error, forecast) => {
      if (error) {
        return res.send({ error })
      }
      return res.send({
        forecast,
        location,
        address
      })
    })
  })


})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error:'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res) => {
  res.render('404',{
    title:'404 Help Article not found',
    name:'Delwyn',
    message:'Help article not found'
  })
})

app.get('*',(req, res) => {
  res.render('404',{
    title:'404',
    name:'Delwyn',
    message:'Page not found'
  })
})

app.listen(3000, ()=>{
  console.log('Server is up on port 3000')
})