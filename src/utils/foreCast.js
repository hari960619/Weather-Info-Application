let request = require('request');

let foreCast = (lat, long, callBackFun) => {
  let url = `http://api.weatherstack.com/current?access_key=1bbb699c970c579a2266f2945e0382f5&query=${lat},${long}`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callBackFun("Network Error...", undefined);
    } else if (body.error) {
      callBackFun(
        "Unable to Find the location, Try another Search !!!",
        undefined
      );
    } else {
      callBackFun(undefined, {
        foreCast: `${body.current.weather_descriptions[0]}, It is ${body.current.temperature} degrees but feels like ${body.current.feelslike} degrees.`,
      });
    }
  });
};

module.exports = foreCast;
