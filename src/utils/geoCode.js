let request = require('request');

let geoCode = (address, callBackFun) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaC1hLXItaS1zLWgtMTkiLCJhIjoiY2t5empvcTM5MHVnZDJwcWtia3czcHcwMSJ9.rGR8thVRxMy_0bopwMgpZw&limit=1`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callBackFun("Network Error...", undefined);
    } else if (body.features.length === 0) {
      callBackFun(
        "Unable to find the location, Try another Search !!!",
        undefined
      );
    } else {
      callBackFun(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        placeName: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;