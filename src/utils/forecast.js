const request=require('request');

const forecast=(latitude,longitude,callback)=>
{
    const url="http://api.weatherstack.com/current?access_key=5ea5a209984d85d401e2d52c1d0bf409&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude);

    request({url,json:true},(error,{body})=>{

        if(error)
        {
            callback("Unable to connect to weather service",undefined)
        }
        else if(body.error)
        {
            callback("Unable to find the weather .Search it with another .",undefined)
        }
        else 
        {
            callback(undefined,{
                description:body.current.weather_descriptions,
                humidity:body.current.humidity,
                temperature:body.current.temperature,
                feelslike:body.current.feelslike
            })
        }

    })
}

module.exports=forecast;