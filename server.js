const net = require("net");

const express = require("express");
const app = express();
const ejs = require("ejs");
var bodyParser = require("body-parser");
const nocache = require("nocache");


app.use(nocache());
const PORT = 8080;
//middlewares
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let socket_client = new net.Socket();
function closeServer(server) {
  server.close();
}
//main logic
let SHOW_CLIENT_DATA = false;

app.get("/", (req, res) => {
  //res.cookie("flag","false");
   
    res.render("index", { text: global_data });

  //res.cookie("flag","false");
});
let global_data = "";
let RECEIVE_CLIENT_DATA = false;
const server = net.createServer((socket) => {
  socket_client = socket;
  app.post("/data", (req, res) => {
    RECEIVE_CLIENT_DATA = true;
    data = req.body.data; // Access the value of the input field with name="data"
    console.log("Received data:", data);
    if (socket.write(data, "utf-8")) {
      console.log("write successfull..");
    }
    socket.on("data", (data) => {
    
        console.log("session ended...");
        RECEIVE_CLIENT_DATA = false;
        SHOW_CLIENT_DATA = false;
        //closeServer(server);
     
    });
    //res.json({ message: 'Data received successfully!' });
  });
  socket.on("data", (data) => {
    const data_obj = JSON.parse(data);
    if(data_obj.data==='0_x_0')
    {
      global_data=global_data;
    }
    else if (!RECEIVE_CLIENT_DATA) {
      console.log("Client data:" + data_obj.data);
      SHOW_CLIENT_DATA = true;
      global_data = data_obj.data;
    }
    /* app.get("/", (req, res) => {
      res.redirect("/"); // Redirect to the same path, causing a reload
    }); */
  });

  // ... Process the data (e.g., validation, database storage) ...

  // Optionally send a response back to the client
});
socket_client.on("data", () => {
  console.log("reachable....");
});
server.listen(
  {
    host: "localhost",
    port: PORT,
  },
  () => {
    console.log("tcp port active.....");
  }
);

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});
