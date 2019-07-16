const request = require('request')
// const geocodeAPI = require('../../CONSTANTS')
const geocodeAPI = 'pk.eyJ1Ijoia2htZXJiMTAiLCJhIjoiY2p4emhzd2k2MDJhbTNscW55bngyazhmcSJ9.94Q92J4HfB2IRLXDtqhZ7w'

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token='+geocodeAPI+'&limit=1'

  request({url, json:true}, (error,{body})=>{
    if (error){
      callback('Unable to connect to location services!',undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.',undefined)
    } else {
      callback(undefined,{
        latitude:body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode