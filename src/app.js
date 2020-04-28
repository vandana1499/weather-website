
const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const app=express();


//console.log(__dirname)
//console.log(__filename)


const publicDirectory=path.join(__dirname,"../public/")
const viewsDirectory=path.join(__dirname, '../templates/views')
const partialsDirectory=path.join(__dirname, '../templates/partials')
//console.log(publicDirectory)

//to use static files

app.use(express.static(publicDirectory))

//to use views for dynamic pages
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);

//For partials

hbs.registerPartials(partialsDirectory)


// app.get('',(req,res)=>{

//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         nane:"Vandana",
//         age:27
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })



app.get('',(req,res)=>{

    res.render('index',{
        title:"Weather App",
        name:"Vandana Gupta"
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:"About Page",
        name:"Vandana Gupta"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        helpText:"This is some help text.",
        name:"Vandana Gupta"
    });
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({error:"You must provide the address"})
    }
    // res.send({
    //     forecast:[{
    //         temperature:25,
    //         feelslike:24,
    //         description:"Partly rain"
    //     }],
    //     address:req.query.address
    // })


    //*latitude ,langitude are properties of data coming in , if no data comes up so we used the deafult parameter "={}" with this */
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
        return res.send({error:error});
        }
        
          forecast(latitude, longitude, (error, {description,temperature,feelslike}={}) => {
            if(error)
            {
              return res.send({error})
            }

            res.send({location,description,temperature,feelslike,address:req.query.address})
            // console.log(location);
            // console.log(description+". It is currently "+temperature+" farenhite. It feels like "+feelslike+" farenhite.")
          })
        
      })




})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:"You must provide the serach query"
        })
    }
    console.log(req.query)
    res.send({produts:[]});
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"Error",
        description:"Help page not found",
        name:"Vandana Gupta"
    })
})
app.get('*',(req,res)=>{

    res.render("404",{
        title:"Error",
        description:"Page not found.",
        name:"Vandana Gupta"
    })
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})