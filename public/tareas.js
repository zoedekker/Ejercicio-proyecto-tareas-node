const url= 'http://localhost:4000/api/tarea'

fetch(url)
.then(res => res.json())
.then (data =>{
    console.log(data)
    data.forEach(e => {
        console.log(e.titulo)
        
    });
})