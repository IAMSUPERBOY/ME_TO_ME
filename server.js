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
let socket_client=new net.Socket();
function closeServer(server)
{
    server.close();
}
//main logic
app.get("/",(req,res)=>{
    res.render("index",{text:""});    
})
let data;
let RECEIVE_CLIENT_DATA=false;
const server=net.createServer((socket)=>{
    socket_client=socket;
        app.post('/data', (req, res) => {
        RECEIVE_CLIENT_DATA=true;
       data = req.body.data; // Access the value of the input field with name="data"
        console.log('Received data:', data);
        if(socket.write(data,'utf-8')){
            console.log("write successfull..");
        };
        socket.on('data',(data)=>{
            if(data.toString()==="SUCCESS")
            {
                //socket.end();
                console.log('session ended...');
                RECEIVE_CLIENT_DATA=false;
                //closeServer(server);
            }
        })
        //res.json({ message: 'Data received successfully!' });
    });

    socket.on('data',(data)=>{

        if (!RECEIVE_CLIENT_DATA)
        {
            console.log("Client data:"+data);
        }
    })
    
    
    
    // ... Process the data (e.g., validation, database storage) ...
    
    // Optionally send a response back to the client
    
});
socket_client.on('data',()=>{
    console.log("reachable....");
})
server.listen({
    host:'localhost',
    port:PORT,
},()=>{
    console.log("tcp port active.....");
})




app.listen(3000,(req,res)=>{
    console.log("App is running on port 3000");
})