// fetch("http://puzzle.mead.io/puzzle").then((response)=>{


//   response.json().then((data)=>{
//       console.log(data)
//   })
// })




const weatherForm=document.querySelector('form');
const search=document.querySelector('input');

const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=search.value;
    messageOne.textContent="Loading....";
    messageTwo.textContent="";
    fetch("/weather/?address="+encodeURIComponent(location))
.then((res)=>{
    res.json()
    .then((data)=>{
        
        if(data.error)
        {
         return  messageOne.textContent=data.error
        }
         const forecast=data.description+".It is currently "+data.temperature+" farenhite.It feels like " +data.feelslike+" farenhite."

         messageOne.textContent=data.location;
         messageTwo.textContent=forecast;
         
     
        
    })
})
    
})