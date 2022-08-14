const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = __dirname + '/views';
const db =require("./models/index");
const cors = require("cors")
var corsOptions = {
    origin: "http://localhost:3001"
}
// app.use(cors(corsOptions));
app.use(express.static(path));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));

db.sequelize.sync()
    .then(()=>{
        console.log("synced db.");
    }).catch((err)=>{
        console.log("fail to sync"+err.message);
    });

// app.get('/',function (req, res) {
//     res.sendFile(path + "index.html");
// })

app.use(express.static(path.join(__dirname,'../tango/build')));

// app.post('/post', function (req, res){
//     res.send("post"+req.body.sttr1)
// });

require("./routes/routes")(app);


app.listen(port, () => console.log("listening on port"+port));