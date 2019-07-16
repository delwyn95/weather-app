const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/c56ace754cb0131c56c0cc1cf25188f9/${latitude},${longitude}?units=si`

  request(({url, json:true}), (error,{body}) => {
    if (error){
      callback('Unable to connect to weather service')
    } else if (body.error){
      callback('Unable to find location')
    } else {
      const weather  = body.currently
      const weatherData = {
        summary:body.daily.data[0].summary,
        temperature:weather.temperature,
        precipitation:weather.precipProbability
      }
      callback(undefined,`${weatherData.summary} It is currently ${weatherData.temperature}˚C with ${weatherData.precipitation}% chance of rain`)
    }
  })
}

module.exports = forecast