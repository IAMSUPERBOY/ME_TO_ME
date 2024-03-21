const net = require("net");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());
let socket_client = new net.Socket();
function closeServer(server) {
  server.close();
}
//main logic
let SHOW_CLIENT_DATA = false;
app.get("/", (req, res) => {
  //res.cookie("flag","false");
  if (!SHOW_CLIENT_DATA) {
    res.render("index", { text: "hey this is something" });
  } else {
    res.render("index", { text: global_data });
    //res.cookie("flag2","false");
  }
  //res.cookie("flag","false");
});
let global_data = "this condition";
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
      //socket.end();
      const data_obj = JSON.parse(data);
      if (data_obj.data === "SUCCESS") {
        console.log("session ended...");
        RECEIVE_CLIENT_DATA = false;
        SHOW_CLIENT_DATA = false;
        //closeServer(server);
      }
    });
    //res.json({ message: 'Data received successfully!' });
  });
  socket.on("data", (data) => {
    const data_obj = JSON.parse(data);
    if (!RECEIVE_CLIENT_DATA) {
      console.log("Client data:" + data_obj.data);
    }
    SHOW_CLIENT_DATA = true;
    global_data = data_obj.data;
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
