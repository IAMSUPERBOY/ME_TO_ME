const net=require('net');
const express=require('express');
const app=express();
const ejs=require('ejs');
var bodyParser=require('body-parser');
const PORT=8080
//middlewares
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

function closeServer(server)
{
    server.close();
}
//main logic
app.get("/",(req,res)=>{
    res.render("index",{text:""});    
})
let data;
app.post('/data', (req, res) => {
   data = req.body.data; // Access the value of the input field with name="data"
    console.log('Received data:', data);
    const server=net.createServer((socket)=>{
        socket.write(data,'utf-8');
        socket.on('data',(data)=>{
            if(data.toString()==="SUCCESS")
            {
                socket.end();
                console.log('session ended...');
                //closeServer(server);
            }
            else if(data)
            {
                res.render("index",{text:data.toString()});
            }
        })
    });
    
    server.listen({
        host:'localhost',
        port:PORT,
    },()=>{
        console.log("tcp port active.....");
    })
  
    // ... Process the data (e.g., validation, database storage) ...
    
    // Optionally send a response back to the client
    res.json({ message: 'Data received successfully!' });
    
  });




app.listen(3000,(req,res)=>{
    console.log("App is running on port 3000");
})