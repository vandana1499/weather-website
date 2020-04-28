const request=require('request');
const geocode=(address,callback)=>{

    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidmFuZGFuYWFhYSIsImEiOiJjazlkeG85ZHAwN3R5M2xtbG5ncnp3dHg5In0.RpGlCkd7Gs8USqM7c3H-NQ&limit=1";
     request({url,json:true},(error,{body}={})=>{
  
        if(error)
        {
           callback("Unable to connect to location service",undefined)
        }
        else if(body.message || body.features.length===0)
        {
          callback("Location not found.Try another search.",undefined)
        }
        else
        {
            
          callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name
          })
  
        }
     })
    
  }
  
  
  
  module.exports=geocode