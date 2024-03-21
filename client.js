const net=require('net');
const express=require('express');
const app=express();
const ejs=require('ejs');
var bodyParser=require('body-parser');

var host='localhost';
const PORT=8080
//middlewares
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
let SHOW_DATA=false;
app.get('/',(req,res)=>{
    if (!SHOW_DATA) {
        res.render("index", { text: "hey this is something"});
      }else
      {
        res.render("index",{text:global_data});
        //res.cookie("flag2","false");
        
      }
})
let global_data;
//create connection 
let client=new net.Socket();
//let client=net.createConnection(PORT,host,()=>{});
let connect_status=false;
function make_connection()
{
    client=net.createConnection(PORT,host,()=>{});
    connect_status=false;
client.on('connect',onConnect);
client.on('data',(data)=>{
    
    console.log(data.toString());
    SHOW_DATA=true;
    global_data=data.toString();
    client.write(JSON.stringify({data:"SUCCESS",send:"client",dest:"server"}));
})
client.on('error',onError);
client.on('close',onClose);
}

make_connection();
function onConnect()
{
    console.log("Connection made...");
    connect_status=true;
}

function onError(err)
{
    if (err.code==='ECONNREFUSED')
    {
        console.log("Waiting for connection.....");
        setTimeout(()=>{
            make_connection();
        
        },1000);
    }
}

function onClose()
{
    if(connect_status==true)
    {
        console.log("Connection successfully closed");
        client.end();
        connect_status=false;
        setTimeout(make_connection,1000);
    }
    
    
    
}
app.post('/data',(req,res)=>{
    data={data:req.body.data,send:"client",dest:"httpserver"};
    console.log("data successfully sent to server...");
    if(client.write(JSON.stringify(data))){
        console.log("This was successfull...");
    };
    SHOW_DATA=false;
})

//main logic


app.listen(3001,(req,res)=>{
    console.log("App is running on port 3000");
})