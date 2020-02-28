const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/36aacc3385dfd60e7eba2b0bc6a5591f/' + latitude + ',' + longitude + '?units=si';

    request( { url, json: true}, (error, {body} ) => {

        if(error){

            callback('Unable to connct to the server.', undefined)

        }
        else if(body.error){

            callback('Unable to get the location.', undefined)

        }

        else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degree celcius out. There is "+body.currently.precipProbability+"% chance of rain.")
        }
    })

}

module.exports = forecast