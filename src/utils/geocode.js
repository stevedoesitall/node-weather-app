const fetch = require('node-fetch')

//Check if we can make this more succinct
const geocode = async (address, callback) => {
  const mapApiKey = 'pk.eyJ1Ijoic3RldmVkb2VzaXRhbGwiLCJhIjoiY2tjZXJjYXh3MDRwOTJ5bnF1Ymxqdm5uYyJ9.OLkkWVz9Xskqni-8Hgr9IA'
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapApiKey}&limit=1`
  const response = await fetch(url)
  if (response.status === 200) {
      const data = await response.json()
      if (!data.error) {
          const features = {
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
            location: data.features[0].place_name
          }
          callback(undefined, features)
      } else {
          callback('Something went wrong!', undefined)
      }
  } else {
      callback('Something went wrong!', undefined)
  }
}

module.exports = geocode